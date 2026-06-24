# Blog / Journal — setup & operation

The blog is fully static-hosted on Netlify. Posts live in **Sanity** (free
content store). The public site **reads** posts directly; **writes** (create /
edit / delete) go through a single **Netlify Function** that holds the secret
Sanity token. Images upload to **Cloudinary** via an unsigned preset.

```
/blog              → list of published posts
/blog/:slug        → a single post
/admin             → owner's branded dashboard (password-gated)
```

## Required environment variables

Set these locally in `.env` (gitignored) **and** in Netlify →
Site settings → Environment variables.

| Variable | Where used | Secret? |
|---|---|---|
| `VITE_SANITY_PROJECT_ID` | browser (read) | no |
| `VITE_SANITY_DATASET` | browser (read) | no |
| `VITE_CLOUDINARY_CLOUD_NAME` | browser (upload) | no |
| `VITE_CLOUDINARY_UPLOAD_PRESET` | browser (upload) | no |
| `SANITY_PROJECT_ID` | function | no |
| `SANITY_DATASET` | function | no |
| `SANITY_WRITE_TOKEN` | function | **YES** |
| `ADMIN_PASSWORD` | function | **YES** |

> `VITE_*` vars are compiled into the public bundle — only put non-secret
> values there. The write token and admin password are used **only** inside the
> Netlify Function and never reach the browser.

## Sanity setup (one-time)
1. Project already created (ID in `.env`).
2. API → Tokens → create an **Editor** token → put it in `SANITY_WRITE_TOKEN`.
3. API → CORS origins → add `https://grandstyleevents.com`,
   `https://www.grandstyleevents.com`, and `http://localhost:5173`
   (allow credentials).

## Cloudinary setup (one-time)
1. Settings → Upload → Upload presets → **Add** → set **Signing Mode = Unsigned**.
2. (Optional) set a folder like `grandstyle/blog`.
3. Put the preset name in `VITE_CLOUDINARY_UPLOAD_PRESET`.
   (No API key/secret needed — unsigned uploads don't use them.)

## Running locally
- `npm run dev` — runs the site, but the `/admin` write API needs the function.
- To test `/admin` end-to-end locally, use the Netlify CLI:
  `npm i -g netlify-cli` then `netlify dev` (serves the function at `/api/posts`).

## Using the admin (for the owner)
1. Go to `grandstyleevents.com/admin`.
2. Enter the admin password.
3. **New post** → fill title, upload a cover image, write the body in Markdown,
   then **Publish** (or **Save as draft**).
4. Published posts appear at `/blog` immediately (reads are live from Sanity).
