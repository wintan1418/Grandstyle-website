// One-off migration: copy EVERY asset from the old Cloudinary account into the
// new one (same public IDs, folders, tags and context metadata), and recreate
// the upload presets and named transformations. Safe to re-run: anything already
// present in the new cloud is skipped.
//
// Usage:  node scripts/migrate-cloudinary.mjs
// Reads from .env:
//   CLOUDINARY_CLOUD_NAME / CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET   (new, target)
//   OLD_CLOUDINARY_CLOUD_NAME / OLD_CLOUDINARY_API_KEY / OLD_CLOUDINARY_API_SECRET (old, source)
// No npm dependencies (Node 18+).

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

for (const line of readFileSync(new URL("../.env", import.meta.url), "utf8").split("\n")) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
  if (m && !(m[1] in process.env)) process.env[m[1]] = m[2];
}

const NEW = { cloud: process.env.CLOUDINARY_CLOUD_NAME, key: process.env.CLOUDINARY_API_KEY, secret: process.env.CLOUDINARY_API_SECRET };
const OLD = { cloud: process.env.OLD_CLOUDINARY_CLOUD_NAME, key: process.env.OLD_CLOUDINARY_API_KEY, secret: process.env.OLD_CLOUDINARY_API_SECRET };
for (const [n, a] of [["new", NEW], ["old", OLD]]) {
  if (!a.cloud || !a.key || !a.secret) { console.error(`Missing ${n}-account CLOUDINARY_* values in .env`); process.exit(1); }
}
const CONCURRENCY = 4;

const api = (a) => `https://api.cloudinary.com/v1_1/${a.cloud}`;
const auth = (a) => ({ Authorization: "Basic " + Buffer.from(`${a.key}:${a.secret}`).toString("base64") });
const getJSON = async (a, path) => (await fetch(`${api(a)}${path}`, { headers: auth(a) })).json();

function sign(params, secret) {
  const toSign = Object.keys(params)
    .filter((k) => params[k] !== undefined && params[k] !== "")
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&");
  return createHash("sha1").update(toSign + secret).digest("hex");
}

// ---------------------------------------------------------------- inventory
async function listAll(a) {
  const out = [];
  for (const rt of ["image", "video", "raw"]) {
    for (const type of ["upload", "private", "authenticated"]) {
      let cursor;
      do {
        const q = `/resources/${rt}/${type}?max_results=500&tags=true&context=true` + (cursor ? `&next_cursor=${cursor}` : "");
        const d = await getJSON(a, q);
        if (d.error) break; // delivery type not enabled on this plan
        for (const r of d.resources || []) out.push({ ...r, resource_type: rt, type });
        cursor = d.next_cursor;
      } while (cursor);
    }
  }
  return out;
}

// ------------------------------------------------------------------- assets
// `version` is only a cache key on Cloudinary's CDN, so any value serves the current
// original. A fresh one is used on retry to get past a CDN-cached 404 (e.g. an asset
// that was a deleted placeholder when first requested and has since been restored).
function sourceUrl(r, version = r.version) {
  const ext = r.resource_type === "raw" ? "" : `.${r.format}`;
  return `https://res.cloudinary.com/${OLD.cloud}/${r.resource_type}/${r.type}/v${version}/${encodeURI(r.public_id)}${ext}`;
}

async function copyAsset(r, have, attempt = 0) {
  const id = `${r.resource_type}/${r.type}/${r.public_id}`;
  if (have.has(id)) return { id, status: "skip" };
  const timestamp = Math.floor(Date.now() / 1000);
  const params = { public_id: r.public_id, timestamp, overwrite: "false", type: r.type };
  if (r.tags?.length) params.tags = r.tags.join(",");
  if (r.context?.custom && Object.keys(r.context.custom).length)
    params.context = Object.entries(r.context.custom).map(([k, v]) => `${k}=${String(v).replace(/[|=]/g, "\\$&")}`).join("|");
  const form = new FormData();
  form.append("file", sourceUrl(r, attempt ? timestamp : undefined)); // Cloudinary pulls it server-side; nothing is downloaded here
  for (const [k, v] of Object.entries(params)) form.append(k, String(v));
  form.append("api_key", NEW.key);
  form.append("signature", sign(params, NEW.secret));
  const res = await fetch(`${api(NEW)}/${r.resource_type}/upload`, { method: "POST", body: form });
  const data = await res.json();
  if (!res.ok) {
    const msg = data?.error?.message || JSON.stringify(data);
    if (attempt === 0 && /not found/i.test(msg)) return copyAsset(r, have, 1); // retry with a cache-busting version
    return { id, status: "fail", error: msg };
  }
  return { id, status: "copied", bytes: data.bytes, version: data.version };
}

async function runPool(items, fn) {
  const results = [];
  let i = 0;
  await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
    while (i < items.length) {
      const idx = i++;
      const r = await fn(items[idx]);
      results[idx] = r;
      const tag = r.status.padEnd(6);
      console.log(`${tag} ${idx + 1}/${items.length}  ${r.id}${r.error ? "  <-- " + r.error : ""}`);
    }
  }));
  return results;
}

// ---------------------------------------------------- presets & transforms
async function copyPresets() {
  const oldP = (await getJSON(OLD, "/upload_presets?max_results=100")).presets || [];
  const newP = new Set(((await getJSON(NEW, "/upload_presets?max_results=100")).presets || []).map((p) => p.name));
  for (const p of oldP) {
    const body = new URLSearchParams({ name: p.name, unsigned: String(!!p.unsigned) });
    for (const [k, v] of Object.entries(p.settings || {})) body.append(k, typeof v === "object" ? JSON.stringify(v) : String(v));
    const method = newP.has(p.name) ? "PUT" : "POST";
    const url = `${api(NEW)}/upload_presets` + (method === "PUT" ? `/${p.name}` : "");
    const res = await fetch(url, { method, headers: auth(NEW), body });
    const d = await res.json();
    console.log(`preset ${p.name} (${p.unsigned ? "unsigned" : "signed"}, folder "${p.settings?.folder || ""}"): ${res.ok ? (method === "PUT" ? "updated to match old" : "created") : "FAILED " + JSON.stringify(d)}`);
  }
}

async function copyTransformations() {
  const oldT = (await getJSON(OLD, "/transformations?named=true&max_results=500")).transformations || [];
  const newT = new Set(((await getJSON(NEW, "/transformations?named=true&max_results=500")).transformations || []).map((t) => t.name));
  for (const t of oldT) {
    const name = t.name.replace(/^t_/, "");
    if (newT.has(t.name)) { console.log(`transformation ${t.name}: already exists`); continue; }
    const detail = await getJSON(OLD, `/transformations/${encodeURIComponent(t.name)}`);
    const def = detail.info?.map((s) => Object.entries(s).map(([k, v]) => `${k}_${v}`).join(",")).join("/") || t.name;
    const res = await fetch(`${api(NEW)}/transformations`, { method: "POST", headers: auth(NEW), body: new URLSearchParams({ name, transformation: def }) });
    console.log(`transformation ${t.name}: ${res.ok ? "created" : "FAILED " + JSON.stringify(await res.json())}`);
  }
}

// --------------------------------------------------------------------- main
console.log(`Source: ${OLD.cloud}   Target: ${NEW.cloud}\n`);
await copyPresets();
await copyTransformations();

console.log("\nListing assets…");
const [oldAssets, newAssets] = await Promise.all([listAll(OLD), listAll(NEW)]);
const have = new Set(newAssets.map((r) => `${r.resource_type}/${r.type}/${r.public_id}`));
console.log(`old account: ${oldAssets.length} assets, ${(oldAssets.reduce((s, r) => s + (r.bytes || 0), 0) / 1e6).toFixed(1)} MB`);
console.log(`new account already has ${newAssets.length} assets\n`);

const results = await runPool(oldAssets, (r) => copyAsset(r, have));

const count = (s) => results.filter((r) => r.status === s).length;
console.log(`\ncopied ${count("copied")}   skipped (already present) ${count("skip")}   failed ${count("fail")}`);
const failed = results.filter((r) => r.status === "fail");
if (failed.length) { console.log("\nFAILED:"); for (const f of failed) console.log(`  ${f.id}: ${f.error}`); }

// Final verification: every old public ID must now exist in the new cloud.
const after = new Set((await listAll(NEW)).map((r) => `${r.resource_type}/${r.type}/${r.public_id}`));
const missing = oldAssets.filter((r) => !after.has(`${r.resource_type}/${r.type}/${r.public_id}`));
console.log(`\nVERIFY: ${oldAssets.length - missing.length}/${oldAssets.length} old assets present in ${NEW.cloud}` + (missing.length ? `\nMISSING: ${missing.map((r) => r.public_id).join(", ")}` : ""));
process.exit(missing.length ? 1 : 0);
