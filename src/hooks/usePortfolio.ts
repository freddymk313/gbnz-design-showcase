import { useQuery } from "@tanstack/react-query";
import {
  fetchPublishedPosters,
  fetchHeroPosters,
  fetchServices,
  fetchPricingItems,
  fetchSiteSettings,
} from "@/lib/sanity/queries";
import {
  allProjects,
  buildCombinedProjects,
  type ProjectItem,
} from "@/data/portfolioData";
import type { SanityPoster, SanityService, SanityPricingItem, SanitySiteSettings } from "@/types/sanity";

/**
 * Hook to retrieve all published posters from Sanity.
 */
export function usePosters() {
  return useQuery<SanityPoster[]>({
    queryKey: ["sanity", "posters"],
    queryFn: fetchPublishedPosters,
    staleTime: 1000 * 30, // 30s de cache
    refetchOnWindowFocus: true, // Se rafraîchit automatiquement quand on revient sur l'onglet
  });
}

/**
 * Hook to retrieve featured posters configured for the Hero section.
 */
export function useHeroPosters() {
  return useQuery<SanityPoster[]>({
    queryKey: ["sanity", "heroPosters"],
    queryFn: fetchHeroPosters,
    staleTime: 1000 * 30,
    refetchOnWindowFocus: true,
  });
}

/**
 * Hook to retrieve services from Sanity.
 * Falls back to empty array — components use static fallback when empty.
 */
export function useServices() {
  return useQuery<SanityService[]>({
    queryKey: ["sanity", "services"],
    queryFn: fetchServices,
    staleTime: 1000 * 60 * 10, // 10 minutes — services rarely change
    refetchOnWindowFocus: false,
  });
}

/**
 * Hook to retrieve pricing items from Sanity.
 * Falls back to empty array — components use static fallback when empty.
 */
export function usePricingItems() {
  return useQuery<SanityPricingItem[]>({
    queryKey: ["sanity", "pricingItems"],
    queryFn: fetchPricingItems,
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
}

/**
 * Hook to retrieve site settings singleton from Sanity.
 * Returns null when no settings document exists yet — components use their own static defaults.
 */
export function useSiteSettings() {
  return useQuery<SanitySiteSettings | null>({
    queryKey: ["sanity", "siteSettings"],
    queryFn: fetchSiteSettings,
    staleTime: 1000 * 60 * 15, // 15 minutes — global settings rarely change
    refetchOnWindowFocus: false,
  });
}

/**
 * Centralized hook providing dynamic portfolio projects from Sanity CMS.
 * Used by Homepage Portfolio and the full PortfolioPage.
 */
export function usePortfolioProjects() {
  const { data: sanityPosters = [], isLoading, isError, error, refetch } = usePosters();

  // Pure Sanity: Seuls les projets publiés dans Sanity CMS sont affichés
  const projects: ProjectItem[] = buildCombinedProjects(sanityPosters);

  return {
    projects,
    allStaticProjects: allProjects,
    sanityPosters,
    isLoading,
    isError,
    error,
    refetch,
    hasSanityPosters: sanityPosters.length > 0,
    useLegacyFallback: false,
  };
}
