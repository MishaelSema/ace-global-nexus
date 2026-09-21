// Cloudinary helper using REST API directly (no SDK dependency)
// Reads CLOUDINARY_URL or individual env vars

const CLOUDINARY_URL = process.env.CLOUDINARY_URL;
const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

function getConfig() {
  if (CLOUDINARY_URL) {
    const match = CLOUDINARY_URL.match(/^cloudinary:\/\/([^:]+):([^@]+)@(.+)$/);
    if (match) {
      return { apiKey: match[1], apiSecret: match[2], cloudName: match[3] };
    }
  }
  if (CLOUD_NAME && API_KEY && API_SECRET) {
    return { apiKey: API_KEY, apiSecret: API_SECRET, cloudName: CLOUD_NAME };
  }
  return null;
}

export function isCloudinaryConfigured(): boolean {
  return getConfig() !== null;
}

export async function uploadToCloudinary(
  file: Buffer,
  filename: string,
  folder: string = "ace-global-nexus"
): Promise<{ url: string; publicId: string; bytes: number; format: string } | null> {
  const config = getConfig();
  if (!config) return null;

  const timestamp = Math.floor(Date.now() / 1000);
  const paramsToSign = `folder=${folder}&timestamp=${timestamp}`;
  const crypto = await import("crypto");
  const signature = crypto
    .createHash("sha1")
    .update(paramsToSign + config.apiSecret)
    .digest("hex");

  const formData = new FormData();
  formData.append("file", new Blob([new Uint8Array(file)], { type: "application/octet-stream" }), filename);
  formData.append("api_key", config.apiKey);
  formData.append("timestamp", String(timestamp));
  formData.append("folder", folder);
  formData.append("signature", signature);

  const ext = filename.split(".").pop()?.toLowerCase() || "";
  const resourceType = ["jpg", "jpeg", "png", "gif", "webp", "heic"].includes(ext) ? "image" : "raw";

  const res = await fetch(`https://api.cloudinary.com/v1_1/${config.cloudName}/${resourceType}/upload`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    const err = await res.text();
    console.error("Cloudinary upload failed:", err);
    return null;
  }
  const data = await res.json();
  return {
    url: data.secure_url || data.url,
    publicId: data.public_id,
    bytes: data.bytes,
    format: data.format,
  };
}

export async function deleteFromCloudinary(
  publicId: string,
  resourceType: "image" | "raw" = "image"
): Promise<boolean> {
  const config = getConfig();
  if (!config || !publicId) return false;

  const timestamp = Math.floor(Date.now() / 1000);
  const crypto = await import("crypto");
  const signature = crypto
    .createHash("sha1")
    .update(`public_id=${publicId}&timestamp=${timestamp}` + config.apiSecret)
    .digest("hex");

  const formData = new FormData();
  formData.append("public_id", publicId);
  formData.append("api_key", config.apiKey);
  formData.append("timestamp", String(timestamp));
  formData.append("signature", signature);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${config.cloudName}/${resourceType}/destroy`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    const stripped = publicId.replace(/\.[^/.]+$/, "");
    if (stripped === publicId) return false;
    const altForm = new FormData();
    altForm.append("public_id", stripped);
    altForm.append("api_key", config.apiKey);
    altForm.append("timestamp", String(timestamp));
    altForm.append("signature", crypto.createHash("sha1").update(`public_id=${stripped}&timestamp=${timestamp}` + config.apiSecret).digest("hex"));
    const altRes = await fetch(`https://api.cloudinary.com/v1_1/${config.cloudName}/${resourceType}/destroy`, {
      method: "POST",
      body: altForm,
    });
    return altRes.ok;
  }
  return res.ok;
}

export function publicIdFromUrl(url: string): string | null {
  if (!url) return null;
  const m = url.match(/\/upload\/v\d+\/(.+)$/);
  if (!m) return null;
  let pid = m[1];
  if (url.includes("/image/upload/")) {
    pid = pid.replace(/\.[a-z0-9]+$/i, "");
  }
  return pid;
}