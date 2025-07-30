import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Instagram,
  Twitter,
  Mail,
  ArrowRight,
  Camera,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PortfolioCard, AboutContent } from "@shared/api";

export default function Index() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<PortfolioCard | null>(
    null,
  );
  const [activeCategory, setActiveCategory] = useState("All");
  const [portfolioImages, setPortfolioImages] = useState<PortfolioCard[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null);

  // Fetch categories and about content on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        if (response.ok) {
          const data = await response.json();
          setCategories(data.categories);
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    
    const fetchAboutContent = async () => {
      try {
        const response = await fetch("/api/about");
        if (response.ok) {
          const data = await response.json();
          setAboutContent(data);
        }
      } catch (err) {
        console.error("Failed to fetch about content:", err);
      }
    };
    
    fetchCategories();
    fetchAboutContent();
  }, []);

  // Fetch portfolio images based on active category
  useEffect(() => {
    const fetchPortfolioImages = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const url =
          activeCategory === "All"
            ? "/api/portfolio"
            : `/api/portfolio?category=${encodeURIComponent(activeCategory)}`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch portfolio: ${response.statusText}`);
        }

        const data = await response.json();

        setPortfolioImages(data.data);
      } catch (err) {
        console.error("Failed to fetch portfolio images:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load portfolio",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolioImages();
  }, [activeCategory]);

  const filteredImages = portfolioImages;

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Camera className="h-8 w-8 text-primary" />
              <span className="text-2xl font-serif font-semibold text-primary">
                Alex Morgan
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#home"
                className="text-foreground hover:text-primary transition-colors"
              >
                Home
              </a>
              <a
                href="#portfolio"
                className="text-foreground hover:text-primary transition-colors"
              >
                Portfolio
              </a>
              <a
                href="#about"
                className="text-foreground hover:text-primary transition-colors"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-foreground hover:text-primary transition-colors"
              >
                Contact
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden glass backdrop-blur-md border-t border-border">
            <div className="px-4 py-4 space-y-4">
              <a
                href="#home"
                className="block text-foreground hover:text-primary transition-colors"
              >
                Home
              </a>
              <a
                href="#portfolio"
                className="block text-foreground hover:text-primary transition-colors"
              >
                Portfolio
              </a>
              <a
                href="#about"
                className="block text-foreground hover:text-primary transition-colors"
              >
                About
              </a>
              <a
                href="#contact"
                className="block text-foreground hover:text-primary transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat parallax"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1920&h=1080&fit=crop&auto=format')`,
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 text-center text-white px-4 animate-fade-in">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light mb-6">
            Capturing
            <br />
            <span className="font-semibold">Moments</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
            Professional photographer specializing in architecture, landscapes,
            and portraits
          </p>
          <Button
            size="lg"
            className="group bg-white text-black hover:bg-white/90 px-8 py-6 text-lg"
            onClick={() =>
              document
                .getElementById("portfolio")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            View My Work
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-serif font-semibold mb-6">
              Portfolio
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A collection of my favorite shots from various projects and
              personal explorations
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                className="transition-all duration-300"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-muted-foreground">
                Loading portfolio...
              </span>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-20">
              <p className="text-destructive mb-4">
                Failed to load portfolio: {error}
              </p>
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
              >
                Try Again
              </Button>
            </div>
          )}

          {/* Image Grid */}
          {!isLoading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredImages.length === 0 ? (
                <div className="col-span-full text-center py-20">
                  <p className="text-muted-foreground text-lg">
                    No images found for this category.
                  </p>
                </div>
              ) : (
                filteredImages.map((image, index) => (
                  <div
                    key={image.id}
                    className={`group cursor-pointer overflow-hidden rounded-lg bg-card shadow-lg hover:shadow-xl transition-all duration-500 animate-zoom-in`}
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => setSelectedImage(image)}
                  >
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300">
                        <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <p className="font-semibold">
                            {image.title || image.alt}
                          </p>
                          <p className="text-sm text-white/80">
                            {image.category}
                          </p>
                          {image.description && (
                            <p className="text-xs text-white/70 mt-1 line-clamp-2">
                              {image.description}
                            </p>
                          )}
                        </div>
                      </div>
                      {image.featured && (
                        <div className="absolute top-4 right-4">
                          <div className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
                            Featured
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-up">
              <h2 className="text-4xl md:text-5xl font-serif font-semibold mb-6">
                About Me
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground">
                {aboutContent ? (
                  aboutContent.content.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))
                ) : (
                  <>
                    <p>
                      I'm Alex Morgan, a passionate photographer with over 8 years
                      of experience capturing the beauty in everyday moments and
                      extraordinary landscapes.
                    </p>
                    <p>
                      My work spans across multiple genres including architecture,
                      landscape, and portrait photography. I believe that every
                      frame tells a story, and I'm dedicated to telling yours with
                      authenticity and artistic vision.
                    </p>
                    <p>
                      Based in San Francisco, I'm available for commissions,
                      collaborations, and adventures around the world.
                    </p>
                  </>
                )}
              </div>
              <div className="flex space-x-4 mt-8">
                <Button variant="outline" size="icon">
                  <Instagram className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon">
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon">
                  <Mail className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="animate-zoom-in">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&auto=format"
                alt="Alex Morgan"
                className="w-full h-[600px] object-cover rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-semibold mb-6 animate-slide-up">
            Let's Work Together
          </h2>
          <p className="text-xl text-muted-foreground mb-12 animate-slide-up">
            Ready to capture your vision? Get in touch and let's create
            something amazing together.
          </p>
          <Button
            size="lg"
            className="px-8 py-6 text-lg animate-zoom-in"
            onClick={() =>
              (window.location.href = "mailto:alex@alexmorgan.photography")
            }
          >
            <Mail className="mr-2 h-5 w-5" />
            Get In Touch
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Camera className="h-6 w-6 text-primary" />
            <span className="text-xl font-serif font-semibold">
              Alex Morgan Photography
            </span>
          </div>
          <p className="text-muted-foreground">
            © 2024 Alex Morgan. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] animate-zoom-in">
            <button
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-8 w-8" />
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-xl font-semibold">
                {selectedImage.title || selectedImage.alt}
              </h3>
              <p className="text-white/80">{selectedImage.category}</p>
              {selectedImage.description && (
                <p className="text-sm text-white/70 mt-2 max-w-md">
                  {selectedImage.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
