import Link from "next/link";
import type { Article } from "@/lib/content";

export function CourseCard({ article }: { article: Article }) {
  return (
    <Link className="lesson-card" href={article.path}>
      <span className="lesson-number">{String(article.number).padStart(2, "0")}</span>
      <span className="lesson-copy">
        <strong>{article.title.replace(/^\d+\s*[·.、]\s*/, "")}</strong>
        <small>{article.description}</small>
      </span>
      <span className="lesson-arrow" aria-hidden="true">→</span>
    </Link>
  );
}
