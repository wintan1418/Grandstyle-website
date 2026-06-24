// Unsigned browser upload to Cloudinary. Uses a public cloud name + unsigned
// upload preset — no API secret involved, so this is safe in the frontend.
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string;

export const cloudinaryConfigured = Boolean(CLOUD_NAME && UPLOAD_PRESET);

export async function uploadImage(file: File): Promise<string> {
  if (!cloudinaryConfigured) {
    throw new Error(
      "Cloudinary is not configured. Set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET."
    );
  }

  const form = new FormData();
  form.append("file", file);
  form.append("upload_preset", UPLOAD_PRESET);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: "POST", body: form }
  );

  if (!res.ok) {
    let msg = "Upload failed.";
    try {
      const data = await res.json();
      msg = data?.error?.message || msg;
    } catch {
      /* ignore */
    }
    throw new Error(msg);
  }

  const data = await res.json();
  return data.secure_url as string;
}
