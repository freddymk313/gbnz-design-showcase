import type { SanityPoster } from "@/types/sanity";
import { getPosterCardUrl, getFullPosterUrl, getPosterDownloadUrl } from "@/lib/sanity/image";

export type Cat = "Tout" | "Logos" | "Affiches" | "Identité Visuelle";
export const cats: Cat[] = ["Tout", "Logos", "Affiches", "Identité Visuelle"];

// Importation dynamique ordonnée des images
const imagesGlob = import.meta.glob('@/assets/portfolio/*.jpg', { eager: true, import: 'default' });

export const sortedImages = Object.entries(imagesGlob)
  .sort(([pathA], [pathB]) => {
    const numA = parseInt(pathA.match(/\/(\d+)\.jpg$/)?.[1] || "0", 10);
    const numB = parseInt(pathB.match(/\/(\d+)\.jpg$/)?.[1] || "0", 10);
    return numA - numB;
  })
  .map(([_, url]) => url as string);

export interface ProjectItem {
  id: number | string;
  title: string;
  label: string;
  cat: "Logos" | "Affiches" | "Identité Visuelle";
  bg: string;
  showLogo?: boolean;
  image: string;
  fullImage?: string;
  altText?: string;
  downloadUrl?: string;
  isSanity?: boolean;
  publishedAt?: string;
}

const projectMetadata: Array<{
  title: string;
  label: string;
  cat: "Logos" | "Affiches" | "Identité Visuelle";
  bg: string;
}> = [
  { title: "Gbnz Design Studio", label: "Logo & Emblème — Identité Officielle", cat: "Logos", bg: "bg-brand-black" },
  { title: "Festival Lumière Lubumbashi", label: "Affiche Officielle — Événement Culturel", cat: "Affiches", bg: "bg-brand-yellow" },
  { title: "Maison Kivu Restaurant", label: "Identité Complète — Gastronomie & Lounge", cat: "Identité Visuelle", bg: "bg-neutral-200" },
  { title: "Tech Congo Hub", label: "Logo & Branding — Incubateur Startup", cat: "Logos", bg: "bg-brand-black" },
  { title: "Fashion Week Kinshasa", label: "Affiche & Programme — Défilé Haute Couture", cat: "Affiches", bg: "bg-brand-yellow" },
  { title: "Banque Élite RDC", label: "Charte Graphique — Institution Financière", cat: "Identité Visuelle", bg: "bg-neutral-200" },
  { title: "Culte d'Action de Grâce", label: "Affiche Église — Célébration Annuelle", cat: "Affiches", bg: "bg-brand-black" },
  { title: "Afro Beat Explosion", label: "Affiche Concert Live — Lubumbashi Arena", cat: "Affiches", bg: "bg-brand-yellow" },
  { title: "Katanga Copper Mining", label: "Logo Institutionnel — Secteur Minier", cat: "Logos", bg: "bg-neutral-200" },
  { title: "Café de la Poste", label: "Identité de Marque — Packaging & Menu", cat: "Identité Visuelle", bg: "bg-brand-black" },
  { title: "Soirée Gala & Charité", label: "Affiche & Invitations — Célébration", cat: "Affiches", bg: "bg-brand-yellow" },
  { title: "Dr. Mukendi Clinic", label: "Logo Médical & Signalétique", cat: "Logos", bg: "bg-neutral-200" },
  { title: "Conférence Leadership 2025", label: "Affiche Événementielle & Roll-up", cat: "Affiches", bg: "bg-brand-black" },
  { title: "Savonnerie du Kasaï", label: "Identité Visuelle & Étiquettes Produits", cat: "Identité Visuelle", bg: "bg-brand-yellow" },
  { title: "Grand Séminaire de la Foi", label: "Affiche Église — Grand Rassemblement", cat: "Affiches", bg: "bg-neutral-200" },
  { title: "Afriq Logistics", label: "Logo & Habillage Flotte Véhicules", cat: "Logos", bg: "bg-brand-black" },
  { title: "Summer Vibes Festival", label: "Affiche & Supports Promotionnels", cat: "Affiches", bg: "bg-brand-yellow" },
  { title: "Boutique Lualaba Luxe", label: "Identité & Packaging Prêt-à-Porter", cat: "Identité Visuelle", bg: "bg-neutral-200" },
];

// 100% Dynamique Sanity : Plus aucune donnée statique de test
export const allProjects: ProjectItem[] = [];

/**
 * Maps a published Sanity poster document to the application's ProjectItem interface.
 */
export function mapSanityPosterToProjectItem(poster: SanityPoster): ProjectItem {
  return {
    id: poster._id,
    title: poster.title,
    label: poster.description || "Création GBNZ Design",
    cat: poster.category || "Affiches",
    bg: "bg-brand-black",
    showLogo: false,
    image: getPosterCardUrl(poster.image),
    fullImage: getFullPosterUrl(poster.image),
    downloadUrl: getPosterDownloadUrl(poster.image, poster.title),
    altText: poster.altText || poster.title,
    isSanity: true,
    publishedAt: poster.publishedAt,
  };
}

/**
 * Returns dynamic projects exclusively from Sanity CMS.
 * No static fallbacks are displayed.
 */
export function buildCombinedProjects(
  sanityPosters: SanityPoster[] = []
): ProjectItem[] {
  if (!sanityPosters || sanityPosters.length === 0) {
    return [];
  }

  return sanityPosters.map(mapSanityPosterToProjectItem);
}

