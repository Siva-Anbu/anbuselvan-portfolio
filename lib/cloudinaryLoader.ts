// lib/cloudinaryLoader.ts
//
// Custom Next.js image loader for Cloudinary.
// Since all image URLs are already fully optimised by Cloudinary
// (with transforms like w_1200,q_85,f_auto baked in), we return
// the src as-is — this prevents Vercel from running a second
// transformation pass and consuming the 5K transformation quota.

export default function cloudinaryLoader({
  src,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  // src is already a fully-formed Cloudinary URL — pass through unchanged
  return src;
}
