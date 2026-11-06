import { sanityClient } from "./client";
import type { SanityPoster, SanityService, SanityPricingItem, SanitySiteSettings } from "@/types/sanity";

/**
 * GROQ query to retrieve all published posters with a valid image asset,
 * ordered by displayOrder ascending, then publishedAt descending.
 */
export const POSTERS_QUERY = `*[_type == "poster" && defined(image.asset)] | order(displayOrder asc, publishedAt desc) {
  _id,
  _type,
  title,
  category,
  image {
    asset,
    crop,
    hotspot
  },
  altText,
  description,
  publishedAt,
  showInHero,
  heroOrder,
  displayOrder
}`;

/**
 * GROQ query to retrieve featured posters for the Hero section (maximum 3),
 * ordered by heroOrder ascending, then publishedAt descending.
 */
export const HERO_POSTERS_QUERY = `*[_type == "poster" && defined(image.asset) && showInHero == true] | order(heroOrder asc, publishedAt desc)[0...3] {
  _id,
  _type,
  title,
  category,
  image {
    asset,
    crop,
    hotspot
  },
  altText,
  description,
  publishedAt,
  showInHero,
  heroOrder,
  displayOrder
}`;

/**
 * GROQ query to retrieve all published services ordered by displayOrder.
 */
export const SERVICES_QUERY = `*[_type == "service"] | order(displayOrder asc) {
  _id,
  _type,
  title,
  description,
  icon,
  featured,
  displayOrder
}`;

/**
 * GROQ query to retrieve all pricing items ordered by category then displayOrder.
 */
export const PRICING_QUERY = `*[_type == "pricingItem"] | order(category asc, displayOrder asc, numericPrice asc) {
  _id,
  _type,
  name,
  subtitle,
  category,
  price,
  numericPrice,
  badge,
  highlight,
  icon,
  features,
  whatsappMessage,
  displayOrder
}`;

/**
 * GROQ query to retrieve site settings singleton.
 */
export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0] {
  _id,
  _type,
  studioName,
  tagline,
  heroSubtitle,
  location,
  whatsappNumber,
  email,
  instagramUrl,
  facebookUrl,
  aboutTitle,
  aboutText1,
  aboutText2,
  statClients,
  statProjects,
  statYears,
  heroClientCount
}`;

/**
 * Fetches all published posters from Sanity.
 * Handles network / API errors gracefully without throwing to caller.
 */
export async function fetchPublishedPosters(): Promise<SanityPoster[]> {
  try {
    const data = await sanityClient.fetch<SanityPoster[]>(POSTERS_QUERY);
    console.log(`[Sanity CMS] Affiches récupérées : ${data?.length || 0}`);
    return data || [];
  } catch (error) {
    console.error("[Sanity CMS] Erreur lors de la récupération des affiches :", error);
    return [];
  }
}

/**
 * Fetches featured posters for the Hero section.
 * Handles network / API errors gracefully without throwing to caller.
 */
export async function fetchHeroPosters(): Promise<SanityPoster[]> {
  try {
    const data = await sanityClient.fetch<SanityPoster[]>(HERO_POSTERS_QUERY);
    console.log(`[Sanity CMS] Affiches Hero récupérées : ${data?.length || 0}`);
    return data || [];
  } catch (error) {
    console.error("[Sanity CMS] Erreur lors de la récupération des affiches Hero :", error);
    return [];
  }
}

/**
 * Fetches all services from Sanity.
 * Returns empty array on error — UI falls back to static data.
 */
export async function fetchServices(): Promise<SanityService[]> {
  try {
    const data = await sanityClient.fetch<SanityService[]>(SERVICES_QUERY);
    return data || [];
  } catch (error) {
    console.error("[Sanity CMS] Error fetching services:", error);
    return [];
  }
}

/**
 * Fetches all pricing items from Sanity.
 * Returns empty array on error — UI falls back to static data.
 */
export async function fetchPricingItems(): Promise<SanityPricingItem[]> {
  try {
    const data = await sanityClient.fetch<SanityPricingItem[]>(PRICING_QUERY);
    return data || [];
  } catch (error) {
    console.error("[Sanity CMS] Error fetching pricing items:", error);
    return [];
  }
}

/**
 * Fetches site settings singleton from Sanity.
 * Returns null on error — UI falls back to static defaults.
 */
export async function fetchSiteSettings(): Promise<SanitySiteSettings | null> {
  try {
    const data = await sanityClient.fetch<SanitySiteSettings | null>(SITE_SETTINGS_QUERY);
    return data || null;
  } catch (error) {
    console.error("[Sanity CMS] Error fetching site settings:", error);
    return null;
  }
}
