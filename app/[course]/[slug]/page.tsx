import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleShell } from "@/components/ArticleShell";
import { articles, getArticle } from "@/lib/content";

export function generateStaticParams() {
  return articles.map(({ course, slug }) => ({ course, slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ course: string; slug: string }> }): Promise<Metadata> {
  const { course, slug } = await params;
  const article = getArticle(course, slug);
  if (!article) return {};
  return { title: article.title, description: article.description, alternates: { canonical: article.path }, openGraph: { title: article.title, description: article.description, url: article.path } };
}

export default async function ArticlePage({ params }: { params: Promise<{ course: string; slug: string }> }) {
  const { course, slug } = await params;
  const article = getArticle(course, slug);
  if (!article) notFound();
  return <ArticleShell article={article} />;
}
