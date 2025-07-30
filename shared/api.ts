/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * Portfolio types for Strapi integration
 */
export interface StrapiImage {
  id: number;
  url: string;
    alternativeText?: string;
    width?: number;
    height?: number;
}

export interface StrapiPortfolioItem {
  id: number;
  title: string;
  description?: string;
  category: string;
  featured?: boolean;
  image: StrapiImage;
  createdAt: string;
  updatedAt: string;
}

export interface StrapiPortfolioResponse {
  data: StrapiPortfolioItem[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface PortfolioCard {
  id: number;
  src: string;
  alt: string;
  category: string;
  title: string;
  description?: string;
  featured?: boolean;
}

/**
 * About section types for Strapi integration
 */
export interface StrapiAboutItem {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface StrapiAboutResponse {
  data: StrapiAboutItem;
  meta: object;
}

export interface AboutContent {
  id: number;
  content: string;
}
