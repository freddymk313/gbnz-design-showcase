export interface SanityImageCrop {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}

export interface SanityImageHotspot {
  x?: number;
  y?: number;
  height?: number;
  width?: number;
}

export interface SanityImageAssetReference {
  _ref: string;
  _type: "reference";
}

export interface SanityImageSource {
  _type?: string;
  asset?: SanityImageAssetReference;
  crop?: SanityImageCrop;
  hotspot?: SanityImageHotspot;
  [key: string]: unknown;
}

export interface SanityPoster {
  _id: string;
  _type: "poster";
  title: string;
  category?: "Affiches" | "Logos" | "Identité Visuelle";
  image: SanityImageSource;
  altText: string;
  description?: string;
  publishedAt: string;
  showInHero?: boolean;
  heroOrder?: number;
  displayOrder?: number;
}

export interface SanityService {
  _id: string;
  _type: "service";
  title: string;
  description: string;
  icon: string;
  featured: boolean;
  displayOrder: number;
}

export interface SanityPricingItem {
  _id: string;
  _type: "pricingItem";
  name: string;
  subtitle: string;
  category: "affiches" | "logos";
  price: string;
  numericPrice: number;
  badge?: string;
  highlight: boolean;
  icon: string;
  features: string[];
  whatsappMessage: string;
  displayOrder: number;
}

export interface SanitySiteSettings {
  _id: string;
  _type: "siteSettings";
  studioName?: string;
  tagline?: string;
  heroSubtitle?: string;
  location?: string;
  whatsappNumber?: string;
  email?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  aboutTitle?: string;
  aboutText1?: string;
  aboutText2?: string;
  statClients?: number;
  statProjects?: number;
  statYears?: number;
  heroClientCount?: string;
}
