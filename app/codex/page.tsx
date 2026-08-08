import type { Metadata } from "next";
import { CourseCard } from "@/components/CourseCard";
import { codexArticles } from "@/lib/content";

export const metadata: Metadata = { title: "Codex 中文教程", description: "39 篇 Codex 主课，从零开始掌握桌面端、CLI、Goal、Skills、MCP、自动化与实战。", alternates: { canonical: "/codex" } };

export default function CodexIndexPage() {
  return (
    <main className="shell course-page">
      <header className="course-hero"><span className="kicker">PRIMARY COURSE · 39 LESSONS</span><h1>Codex 中文教程</h1><p>本站主线。从认识四种入口开始，一路走到安全、Skills、多任务、自动化、企业治理与综合实战。</p><div className="course-badge">推荐：按编号顺序学习</div></header>
      <div className="course-list">{codexArticles.map((article) => <CourseCard article={article} key={article.path} />)}</div>
    </main>
  );
}
