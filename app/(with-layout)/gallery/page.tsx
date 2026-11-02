import type { Metadata } from "next";
import { galleryPictures } from "@/lib/gallery";
import GalleryView from "@/components/liquid/gallery-view";

export const metadata: Metadata = { title: "Gallery" };
// Re-read the Drive folder hourly (keep in sync with GALLERY_REVALIDATE).
export const revalidate = 3600;

export default async function GalleryPage() {
  return <GalleryView pictures={await galleryPictures()} />;
}
