import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "/",
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];
}
