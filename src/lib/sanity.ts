import { createClient, type SanityClient } from "@sanity/client";

// Public, read-only Sanity config. Project ID + dataset are safe to expose.
// Reads are served from Sanity's CDN. Never put the write token here —
// writes go through the Netlify Function (see netlify/functions/posts.ts).
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID as string | undefined;
const dataset = (import.meta.env.VITE_SANITY_DATASET as string) || "production";

export const sanityConfigured = Boolean(projectId);

// IMPORTANT: createClient throws if projectId is missing. We guard it so a
// missing/blank env var degrades the blog gracefully instead of crashing the
// entire site (the marketing pages must always render).
let client: SanityClient | null = null;
if (sanityConfigured) {
  client = createClient({
    projectId: projectId as string,
    dataset,
    apiVersion: "2024-01-01",
    useCdn: true,
  });
} else if (import.meta.env.DEV) {
  // eslint-disable-next-line no-console
  console.warn(
    "[sanity] VITE_SANITY_PROJECT_ID is not set — the blog will show no posts."
  );
}

export interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverImageUrl?: string;
  body: string;
  author?: string;
  publishedAt?: string;
  status: "draft" | "published";
}

// Only published posts, newest first.
const PUBLISHED_LIST = `*[_type == "post" && status == "published"] | order(publishedAt desc){
  _id, title, "slug": slug.current, excerpt, coverImageUrl, author, publishedAt, status
}`;

const PUBLISHED_BY_SLUG = `*[_type == "post" && status == "published" && slug.current == $slug][0]{
  _id, title, "slug": slug.current, excerpt, coverImageUrl, body, author, publishedAt, status
}`;

export async function getPublishedPosts(): Promise<Post[]> {
  if (!client) return [];
  return client.fetch(PUBLISHED_LIST);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!client) return null;
  return client.fetch(PUBLISHED_BY_SLUG, { slug });
}
