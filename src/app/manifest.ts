import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Iwacu Chef",
    short_name: "IwacuChef",
    description: "Homemade, from our home to yours — connect with local home chefs in Rwanda.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#C75B2A",
    orientation: "portrait-primary",
    categories: ["food", "lifestyle"],
    icons: [
      { src: "/favicon.svg", sizes: "48x48", type: "image/svg+xml", purpose: "any" },
      { src: "/favicon.svg", sizes: "72x72", type: "image/svg+xml", purpose: "any" },
      { src: "/favicon.svg", sizes: "96x96", type: "image/svg+xml", purpose: "any" },
      { src: "/favicon.svg", sizes: "128x128", type: "image/svg+xml", purpose: "any" },
      { src: "/favicon.svg", sizes: "192x192", type: "image/svg+xml", purpose: "any" },
      { src: "/favicon.svg", sizes: "384x384", type: "image/svg+xml", purpose: "any" },
      { src: "/favicon.svg", sizes: "512x512", type: "image/svg+xml", purpose: "any" },
    ],
  }
}
