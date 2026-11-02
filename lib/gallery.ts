import fs from "node:fs";
import path from "node:path";
// Public Google Drive folder the gallery reads from.
const DRIVE_FOLDER = "1csqktx2Hy31tsoi3WnX6-Gxjd9kBhA7y";
// A Drive photo on Google's image CDN, capped at 2000px wide. Next's image
// optimizer fetches it once and serves resized, cached copies to visitors, so
// Google isn't hit (and doesn't rate-limit) on every page view.
const driveImage = (id: string) => `https://lh3.googleusercontent.com/d/${id}=w2000`;
// How often (seconds) the folder is re-read, so new photos show up without a redeploy.
export const GALLERY_REVALIDATE = 3600;

const PICTURE = /\.(jpe?g|png|webp|avif|gif|heic)$/i;
const byName = (a: string, b: string) => a.localeCompare(b, undefined, { numeric: true });

// Lists the image files in the public folder from Drive's embeddable folder
// view, which needs no API key. Returns null if Drive can't be read.
async function drivePictures(): Promise<string[] | null> {
  try {
    const res = await fetch(`https://drive.google.com/embeddedfolderview?id=${DRIVE_FOLDER}`, {
      next: { revalidate: GALLERY_REVALIDATE },
    });
    if (!res.ok) return null;
    const html = await res.text();
    const entries = Array.from(
      html.matchAll(/id="entry-([\w-]+)"([\s\S]*?)flip-entry-title">([^<]*)</g),
      ([, id, body, title]) => ({ id, title, image: body.includes("/type/image/") || PICTURE.test(title) })
    );
    return entries
      .filter((e) => e.image)
      .sort((a, b) => byName(a.title, b.title))
      .map((e) => driveImage(e.id));
  } catch {
    return null;
  }
}

// Fallback: images in public/gallery.
function localPictures() {
  try {
    return fs
      .readdirSync(path.join(process.cwd(), "public", "gallery"))
      .filter((f) => PICTURE.test(f))
      .sort(byName)
      .map((f) => `/gallery/${encodeURIComponent(f)}`);
  } catch {
    return [];
  }
}

export async function galleryPictures() {
  return (await drivePictures()) ?? localPictures();
}
