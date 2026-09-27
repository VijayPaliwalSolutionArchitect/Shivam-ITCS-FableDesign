import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/utils";

/**
 * URL structure preserved 1:1 with the indexed production site —
 * every existing route keeps its canonical URL.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }> = [
    { path: "", priority: 1.0, changeFrequency: "weekly" },
    { path: "/architecture", priority: 0.9, changeFrequency: "monthly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    { path: "/solutions", priority: 0.8, changeFrequency: "monthly" },
    { path: "/work", priority: 0.8, changeFrequency: "monthly" },
    { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" },
    { path: "/terms-of-use", priority: 0.2, changeFrequency: "yearly" },
  ];

  return routes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
