import type { Handler } from "@netlify/functions";
import { createClient } from "@sanity/client";

// Server-side client with the WRITE token. This file runs only on Netlify's
// servers — the token is never sent to the browser.
const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID as string,
  dataset: (process.env.SANITY_DATASET as string) || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN as string,
  useCdn: false,
});

const json = (statusCode: number, body: unknown) => ({
  statusCode,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 96);

interface PostInput {
  _id?: string;
  title: string;
  slug?: string;
  excerpt?: string;
  coverImageUrl?: string;
  body: string;
  author?: string;
  publishedAt?: string;
  status?: "draft" | "published";
}

const toDoc = (p: PostInput) => {
  const slugCurrent = slugify(p.slug || p.title || "");
  return {
    _type: "post",
    title: p.title || "Untitled",
    slug: { _type: "slug", current: slugCurrent },
    excerpt: p.excerpt || "",
    coverImageUrl: p.coverImageUrl || "",
    body: p.body || "",
    author: p.author || "",
    publishedAt: p.publishedAt || new Date().toISOString(),
    status: p.status === "published" ? "published" : "draft",
  };
};

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed" });
  }

  if (!process.env.SANITY_WRITE_TOKEN || !process.env.ADMIN_PASSWORD) {
    return json(500, { error: "Server is not configured." });
  }

  let data: { password?: string; action?: string; payload?: PostInput; id?: string };
  try {
    data = JSON.parse(event.body || "{}");
  } catch {
    return json(400, { error: "Invalid request body." });
  }

  // Simple shared-password gate for the owner.
  if (!data.password || data.password !== process.env.ADMIN_PASSWORD) {
    return json(401, { error: "Incorrect password." });
  }

  try {
    switch (data.action) {
      case "list": {
        const posts = await client.fetch(
          `*[_type == "post"] | order(publishedAt desc){
            _id, title, "slug": slug.current, excerpt, coverImageUrl, body, author, publishedAt, status
          }`
        );
        return json(200, { posts });
      }

      case "create": {
        if (!data.payload?.title) return json(400, { error: "Title is required." });
        const created = await client.create(toDoc(data.payload));
        return json(200, { post: created });
      }

      case "update": {
        const id = data.payload?._id || data.id;
        if (!id) return json(400, { error: "Missing post id." });
        const doc = toDoc(data.payload as PostInput);
        const updated = await client.patch(id).set(doc).commit();
        return json(200, { post: updated });
      }

      case "delete": {
        const id = data.id || data.payload?._id;
        if (!id) return json(400, { error: "Missing post id." });
        await client.delete(id);
        return json(200, { ok: true });
      }

      default:
        return json(400, { error: "Unknown action." });
    }
  } catch (err) {
    return json(500, {
      error: err instanceof Error ? err.message : "Sanity request failed.",
    });
  }
};
