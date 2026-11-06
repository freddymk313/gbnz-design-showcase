import { createClient } from "@sanity/client";

export const sanityConfig = {
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || "vx28qj46",
  dataset: import.meta.env.VITE_SANITY_DATASET || "production",
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION || "2026-11-05",
  // useCdn: false pour garantir la fraîcheur immédiate des données publiées dans Sanity Studio
  useCdn: false,
  perspective: "published" as const,
};

/**
 * Read-only Sanity Client.
 *
 * CRITICAL SECURITY:
 * - Only queries published documents.
 * - Uses public CDN without write permissions.
 * - No private API tokens are exposed on the client.
 */
export const sanityClient = createClient(sanityConfig);
