// One-off migration: copy the site's Cloudinary assets from the old account into
// the new one (same public IDs) and create the unsigned upload preset used by /admin.
//
// Usage:  node scripts/migrate-cloudinary.mjs
// Reads CLOUDINARY_CLOUD_NAME / CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET and
// OLD_CLOUDINARY_CLOUD_NAME from .env. No npm dependencies (Node 18+).

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

// --- tiny .env loader (no dotenv dependency) --------------------------------
for (const line of readFileSync(new URL("../.env", import.meta.url), "utf8").split("\n")) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
  if (m && !(m[1] in process.env)) process.env[m[1]] = m[2];
}

const CLOUD = process.env.CLOUDINARY_CLOUD_NAME;
const KEY = process.env.CLOUDINARY_API_KEY;
const SECRET = process.env.CLOUDINARY_API_SECRET;
const OLD_CLOUD = process.env.OLD_CLOUDINARY_CLOUD_NAME;
const PRESET = process.env.VITE_CLOUDINARY_UPLOAD_PRESET || "grandstyle";

if (!CLOUD || !KEY || !SECRET || !OLD_CLOUD) {
  console.error("Missing CLOUDINARY_* or OLD_CLOUDINARY_CLOUD_NAME in .env");
  process.exit(1);
}

// Every asset the site references, keyed by public ID (folder included).
const ASSETS = [
  { resource_type: "image", public_id: "logo folder/grandstyle logo", format: "png" },
  { resource_type: "video", public_id: "featured/GRAND_STYLE_IMASAYI_CANOPY_1_ajynib", format: "mp4" },
];

const API = `https://api.cloudinary.com/v1_1/${CLOUD}`;
const auth = "Basic " + Buffer.from(`${KEY}:${SECRET}`).toString("base64");

function sign(params) {
  const toSign = Object.keys(params)
    .filter((k) => params[k] !== undefined && params[k] !== "")
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&");
  return createHash("sha1").update(toSign + SECRET).digest("hex");
}

async function ensurePreset() {
  const list = await (await fetch(`${API}/upload_presets?max_results=100`, { headers: { Authorization: auth } })).json();
  if ((list.presets || []).some((p) => p.name === PRESET)) {
    console.log(`preset "${PRESET}" already exists`);
    return;
  }
  const body = new URLSearchParams({ name: PRESET, unsigned: "true", folder: "journal" });
  const res = await fetch(`${API}/upload_presets`, { method: "POST", headers: { Authorization: auth }, body });
  const data = await res.json();
  if (!res.ok) throw new Error(`preset create failed: ${JSON.stringify(data)}`);
  console.log(`created unsigned preset "${PRESET}" (uploads land in folder "journal/")`);
}

async function exists(a) {
  const res = await fetch(`${API}/resources/${a.resource_type}/upload/${encodeURIComponent(a.public_id)}`, {
    headers: { Authorization: auth },
  });
  return res.ok ? await res.json() : null;
}

async function copy(a) {
  const have = await exists(a);
  if (have) {
    console.log(`skip  ${a.resource_type} ${a.public_id} (already on ${CLOUD}, v${have.version})`);
    return have;
  }
  // Cloudinary fetches the source URL server-side, so the 70 MB video never touches this machine.
  const source = `https://res.cloudinary.com/${OLD_CLOUD}/${a.resource_type}/upload/${encodeURI(a.public_id)}.${a.format}`;
  const timestamp = Math.floor(Date.now() / 1000);
  const params = { public_id: a.public_id, timestamp, overwrite: "false" };
  const form = new FormData();
  form.append("file", source);
  for (const [k, v] of Object.entries(params)) form.append(k, String(v));
  form.append("api_key", KEY);
  form.append("signature", sign(params));
  const res = await fetch(`${API}/${a.resource_type}/upload`, { method: "POST", body: form });
  const data = await res.json();
  if (!res.ok) throw new Error(`upload failed for ${a.public_id}: ${JSON.stringify(data)}`);
  console.log(`copied ${a.resource_type} ${a.public_id} -> v${data.version} (${(data.bytes / 1e6).toFixed(1)} MB)`);
  return data;
}

await ensurePreset();
for (const a of ASSETS) await copy(a);
console.log("\nDelivery base for the new account:");
console.log(`  https://res.cloudinary.com/${CLOUD}/image/upload/...`);
console.log(`  https://res.cloudinary.com/${CLOUD}/video/upload/...`);
