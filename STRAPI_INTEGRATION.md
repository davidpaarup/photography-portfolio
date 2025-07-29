# Strapi Integration for Photography Portfolio

This documentation explains how to set up and use Strapi CMS to manage portfolio content.

## Setup

### 1. Environment Variables

Copy `.env.example` to `.env` and configure your Strapi instance:

```bash
cp .env.example .env
```

Edit `.env`:
```
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your_strapi_api_token_here
```

### 2. Strapi Content Type Configuration

Create a content type called `portfolio-item` in your Strapi admin panel with the following fields:

#### Fields:
- **title** (Text, required): Title of the portfolio item
- **description** (Text, optional): Description of the portfolio item  
- **category** (Text, required): Category (e.g., "Architecture", "Landscape", "Portrait", "Street", "Nature")
- **featured** (Boolean, optional): Whether this item should be marked as featured
- **image** (Single Media, required): The portfolio image

#### API Configuration:
1. Go to Settings → Roles → Public
2. Enable the following permissions for `portfolio-item`:
   - `find` (to fetch all items)
   - `findOne` (to fetch individual items)

### 3. API Token (Optional but Recommended)

For production or private content:

1. Go to Settings → API Tokens
2. Create a new token with `Read-only` access
3. Copy the token to your `STRAPI_API_TOKEN` environment variable

## API Endpoints

The application provides these API endpoints:

### GET `/api/portfolio`
Fetches all portfolio items, or filtered by category.

**Query Parameters:**
- `category` (optional): Filter by category name

**Examples:**
```bash
# Get all portfolio items
curl http://localhost:8080/api/portfolio

# Get items in "Architecture" category
curl http://localhost:8080/api/portfolio?category=Architecture
```

### GET `/api/categories`
Fetches all unique categories from portfolio items.

**Example:**
```bash
curl http://localhost:8080/api/categories
```

## Fallback Behavior

If Strapi is not available or configured, the application will automatically fall back to sample data, ensuring the portfolio always displays content.

## Data Structure

### Frontend Data Format
```typescript
interface PortfolioCard {
  id: number;
  src: string;           // Full image URL
  alt: string;           // Alt text for the image
  category: string;      // Category name
  title: string;         // Portfolio item title
  description?: string;  // Optional description
  featured?: boolean;    // Whether item is featured
}
```

### Strapi Response Format
The API automatically transforms Strapi's response format to the frontend format:

```typescript
// Strapi format (input)
{
  "id": 1,
  "attributes": {
    "title": "Urban Architecture",
    "description": "Modern building design",
    "category": "Architecture", 
    "featured": true,
    "image": {
      "data": {
        "attributes": {
          "url": "/uploads/image.jpg",
          "alternativeText": "Urban building"
        }
      }
    }
  }
}

// Frontend format (output)
{
  "id": 1,
  "src": "http://localhost:1337/uploads/image.jpg",
  "alt": "Urban building",
  "category": "Architecture",
  "title": "Urban Architecture", 
  "description": "Modern building design",
  "featured": true
}
```

## Development

The application includes loading states, error handling, and automatic retries for a smooth user experience even when Strapi is temporarily unavailable.

### Loading States
- Shows spinner while fetching data
- Graceful loading for category changes

### Error Handling  
- Falls back to sample data if Strapi is unavailable
- Shows user-friendly error messages
- Includes retry functionality

## Production Deployment

For production deployment:

1. Set `STRAPI_URL` to your production Strapi instance
2. Set `STRAPI_API_TOKEN` to a production API token
3. Ensure your Strapi instance has the correct CORS configuration
4. Configure proper permissions in Strapi for public access
