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
    const url = `${STRAPI_URL}/api/portfolio-items?fields[0]=category`;
    const headers = {
      "Content-Type": "application/json"
    };
    
    if (STRAPI_API_TOKEN) {
      headers["Authorization"] = `Bearer ${STRAPI_API_TOKEN}`;
    }
    
    const response = await fetch(url, { headers });
    
    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
    }
    
    const strapiData = await response.json();
    const categories = [
      "All",
      ...new Set(strapiData.data.map((item) => item.category))
    ];
    
    res.json({ categories });
  } catch (error) {
    console.error("Categories API error:", error);
    
    res.json({
      categories: [
        "All",
        "Architecture",
        "Landscape",
        "Portrait",
        "Street",
        "Nature"
      ]
    });
  }
}