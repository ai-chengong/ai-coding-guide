import type { MetadataRoute } from "next";
import { articles } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://coding.aichengong.com";
  const staticPaths = ["", "/codex", "/claude-code", "/sources", "/license"];
  return [
    ...staticPaths.map((path) => ({ url: `${base}${path}`, changeFrequency: "weekly" as const, priority: path === "" ? 1 : .8 })),
    ...articles.map((article) => ({ url: `${base}${article.path}`, changeFrequency: "monthly" as const, priority: article.course === "codex" ? .75 : .65 })),
  ];
}
