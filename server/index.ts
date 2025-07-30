import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handlePortfolio, handleCategories } from "./routes/portfolio";
import { handleAbout } from "./routes/about";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "Hello from Express server v2!" });
  });

  app.get("/api/demo", handleDemo);

  // Portfolio API routes
  app.get("/api/portfolio", handlePortfolio);
  app.get("/api/categories", handleCategories);

  // About API route
  app.get("/api/about", handleAbout);

  return app;
}
