import { RequestHandler } from "express";
import { StrapiAboutResponse, AboutContent } from "@shared/api";

const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

export const handleAbout: RequestHandler = async (req, res) => {
  try {

    // Build Strapi API URL for about content
    const url = `${STRAPI_URL}/api/about`;

    // Set up headers for Strapi request
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (STRAPI_API_TOKEN) {
      headers["Authorization"] = `Bearer ${STRAPI_API_TOKEN}`;
    }

    // Fetch from Strapi
    const response = await fetch(url, { headers });

    console.log(url)
    if (!response.ok) {
      throw new Error(
        `Strapi API error: ${response.status} ${response.statusText}`,
      );
    }

    const strapiData: StrapiAboutResponse = await response.json();

    // Transform Strapi data to our frontend format
    const aboutContent: AboutContent = {
      id: strapiData.data.id,
      content: strapiData.data.content,
    };

    res.json(aboutContent);
  } catch (error) {
    console.error("About API error:", error);

    // Fallback to default content if Strapi is not available
    const fallbackContent: AboutContent = {
      id: 1,
      content: `I'm Alex Morgan, a passionate photographer with over 8 years of experience capturing the beauty in everyday moments and extraordinary landscapes.

My work spans across multiple genres including architecture, landscape, and portrait photography. I believe that every frame tells a story, and I'm dedicated to telling yours with authenticity and artistic vision.

Based in San Francisco, I'm available for commissions, collaborations, and adventures around the world.`,
    };

    res.json(fallbackContent);
  }
};