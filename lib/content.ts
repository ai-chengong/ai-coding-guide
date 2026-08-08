import { content } from "@/generated/content";

export type Course = "codex" | "claude-code";

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export interface Article {
  course: Course;
  slug: string;
  number: number;
  path: string;
  title: string;
  description: string;
  html: string;
  toc: TocItem[];
  localImages: string[];
  sourceUrl: string;
}

export const articles = content.articles as unknown as Article[];
export const baselineCommit = content.baselineCommit;

export const codexArticles = articles.filter((article) => article.course === "codex");
export const claudeArticles = articles.filter((article) => article.course === "claude-code");

export function getArticle(course: string, slug: string) {
  return articles.find((article) => article.course === course && article.slug === slug);
}

export function getCourseArticles(course: Course) {
  return course === "codex" ? codexArticles : claudeArticles;
}

export function courseLabel(course: Course) {
  return course === "codex" ? "Codex 主课" : "Claude Code 辅修";
}
