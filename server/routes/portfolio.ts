import { RequestHandler } from "express";
import { StrapiPortfolioResponse, PortfolioCard } from "@shared/api";

const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

export const handlePortfolio: RequestHandler = async (req, res) => {
  try {
    const { category } = req.query;

    // Build Strapi API URL with filters
    let url = `${STRAPI_URL}/api/portfolio-items?populate=image`;

    if (category && category !== "All") {
      url += `&filters[category][$eq]=${encodeURIComponent(category as string)}`;
    }

    // Set up headers for Strapi request
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    console.log("strapi api token", STRAPI_API_TOKEN);

    if (STRAPI_API_TOKEN) {
      
      headers["Authorization"] = `Bearer ${STRAPI_API_TOKEN}`;
    }

    // Fetch from Strapi
    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw new Error(
        `Strapi API error: ${response.status} ${response.statusText}`,
      );
    }

    const strapiData: StrapiPortfolioResponse = await response.json();

    // Transform Strapi data to our frontend format
    const portfolioCards: PortfolioCard[] = strapiData.data.map((item) => ({
      id: item.id,
      src: item.image[0]
        ? item.image[0].url
        : "/placeholder.svg",
      alt:
        item.image[0]?.alternativeText ||
        item.title,
      category: item.category,
      title: item.title,
      description: item.description,
      featured: item.featured || false,
    }));

    res.json({
      data: portfolioCards,
      meta: strapiData.meta,
    });
  } catch (error) {
    console.error("Portfolio API error:", error);

    // Fallback to sample data if Strapi is not available
    const fallbackData: PortfolioCard[] = [
      {
        id: 1,
        src: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=1200&fit=crop&auto=format",
        alt: "Urban Architecture",
        category: "Architecture",
        title: "Urban Architecture",
        featured: true,
      },
      {
        id: 2,
        src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop&auto=format",
        alt: "Mountain Landscape",
        category: "Landscape",
        title: "Mountain Landscape",
        featured: false,
      },
      {
        id: 3,
        src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1000&fit=crop&auto=format",
        alt: "Portrait Session",
        category: "Portrait",
        title: "Portrait Session",
        featured: true,
      },
      {
        id: 5,
        src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=1200&fit=crop&auto=format",
        alt: "Nature Close-up",
        category: "Nature",
        title: "Nature Close-up",
        featured: false,
      },
      {
        id: 6,
        src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop&auto=format",
        alt: "Urban Night",
        category: "Street",
        title: "Urban Night",
        featured: false,
      },
    ];

    res.json({
      data: fallbackData,
      meta: {
        pagination: {
          page: 1,
          pageSize: fallbackData.length,
          pageCount: 1,
          total: fallbackData.length,
        },
      },
    });
  }
};

export const handleCategories: RequestHandler = async (req, res) => {
  try {
    const url = `${STRAPI_URL}/api/portfolio-items?fields[0]=category`;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (STRAPI_API_TOKEN) {
      headers["Authorization"] = `Bearer ${STRAPI_API_TOKEN}`;
    }

    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw new Error(
        `Strapi API error: ${response.status} ${response.statusText}`,
      );
    }

    const strapiData: StrapiPortfolioResponse = await response.json();

    // Extract unique categories
    const categories = [
      "All",
      ...new Set(strapiData.data.map((item) => item.category)),
    ];

    res.json({ categories });
  } catch (error) {
    console.error("Categories API error:", error);

    // Fallback categories
    res.json({
      categories: [
        "All",
        "Architecture",
        "Landscape",
        "Portrait",
        "Street",
        "Nature",
      ],
    });
  }
};
