import { createClient } from "@sanity/client";

// Public, read-only client. Project ID + dataset are safe to expose.
// Reads are served from Sanity's CDN. Never put the write token here —
// writes go through the Netlify Function (see netlify/functions/posts.ts).
export const sanity = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID as string,
  dataset: (import.meta.env.VITE_SANITY_DATASET as string) || "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

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
  return sanity.fetch(PUBLISHED_LIST);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return sanity.fetch(PUBLISHED_BY_SLUG, { slug });
}
