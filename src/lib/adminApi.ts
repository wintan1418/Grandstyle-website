import type { Post } from "./sanity";

// All admin writes go through the Netlify Function at /api/posts, which holds
// the secret Sanity token. The owner's password is sent with each request.
const ENDPOINT = "/api/posts";

export type PostDraft = Omit<Post, "_id"> & { _id?: string };

async function call<T>(body: Record<string, unknown>): Promise<T> {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.error || `Request failed (${res.status}).`);
  }
  return data as T;
}

export const adminApi = {
  list: (password: string) =>
    call<{ posts: Post[] }>({ password, action: "list" }).then((d) => d.posts),

  create: (password: string, payload: PostDraft) =>
    call<{ post: Post }>({ password, action: "create", payload }).then((d) => d.post),

  update: (password: string, payload: PostDraft) =>
    call<{ post: Post }>({ password, action: "update", payload }).then((d) => d.post),

  remove: (password: string, id: string) =>
    call<{ ok: boolean }>({ password, action: "delete", id }),
};
