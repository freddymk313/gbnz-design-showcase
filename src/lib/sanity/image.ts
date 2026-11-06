import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "./client";
import type { SanityImageSource } from "@/types/sanity";

// Initialize the image URL builder with the configured Sanity client
const builder = imageUrlBuilder(sanityClient);

/**
 * Creates an image URL builder for a Sanity image source,
 * respecting crop and hotspot metadata if defined.
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/**
 * Returns an optimized image URL for portfolio cards in the masonry grid and swipe deck.
 * Preserves the poster's original aspect ratio while ensuring fast delivery and sharpness.
 */
export function getPosterCardUrl(source: SanityImageSource, width = 800): string {
  if (!source) return "";
  try {
    return builder
      .image(source)
      .width(width)
      .auto("format")
      .quality(85)
      .fit("max")
      .url();
  } catch {
    return "";
  }
}

/**
 * Returns an optimized image URL for the 3 floating Hero cards.
 */
export function getHeroPosterUrl(source: SanityImageSource, width = 800): string {
  if (!source) return "";
  try {
    return builder
      .image(source)
      .width(width)
      .auto("format")
      .quality(85)
      .fit("max")
      .url();
  } catch {
    return "";
  }
}

/**
 * Returns a high-resolution image URL for the full-screen ProjectModal preview.
 */
export function getFullPosterUrl(source: SanityImageSource, width = 1800): string {
  if (!source) return "";
  try {
    return builder
      .image(source)
      .width(width)
      .auto("format")
      .quality(90)
      .fit("max")
      .url();
  } catch {
    return "";
  }
}

/**
 * Returns a direct download URL from Sanity CDN with Content-Disposition attachment header,
 * allowing instant cross-origin downloads.
 */
export function getPosterDownloadUrl(source: SanityImageSource, filename: string): string {
  if (!source) return "";
  try {
    const cleanFilename = (filename || "affiche-gbnz-design")
      .trim()
      .replace(/[^a-zA-Z0-9-_.]+/g, "-")
      .toLowerCase();
    const finalFilename = cleanFilename.endsWith(".jpg") || cleanFilename.endsWith(".png")
      ? cleanFilename
      : `${cleanFilename}.jpg`;

    // Sanity image CDN supports ?dl=filename query param to trigger download headers
    return builder
      .image(source)
      .auto("format")
      .quality(95)
      .forceDownload(finalFilename)
      .url();
  } catch {
    return "";
  }
}
