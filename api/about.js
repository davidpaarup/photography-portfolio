const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const url = `${STRAPI_URL}/api/about`;
    const headers = {
      "Content-Type": "application/json"
    };
    
    if (STRAPI_API_TOKEN) {
      headers["Authorization"] = `Bearer ${STRAPI_API_TOKEN}`;
    }
    
    const response = await fetch(url, { headers });
    console.log(url);
    
    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
    }
    
    const strapiData = await response.json();
    const aboutContent = {
      id: strapiData.data.id,
      content: strapiData.data.content
    };
    
    res.json(aboutContent);
  } catch (error) {
    console.error("About API error:", error);
    
    const fallbackContent = {
      id: 1,
      content: `I'm Alex Morgan, a passionate photographer with over 8 years of experience capturing the beauty in everyday moments and extraordinary landscapes.

My work spans across multiple genres including architecture, landscape, and portrait photography. I believe that every frame tells a story, and I'm dedicated to telling yours with authenticity and artistic vision.

Based in San Francisco, I'm available for commissions, collaborations, and adventures around the world.`
    };
    
    res.json(fallbackContent);
  }
}