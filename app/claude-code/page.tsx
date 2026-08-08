import type { Metadata } from "next";
import { CourseCard } from "@/components/CourseCard";
import { claudeArticles } from "@/lib/content";

export const metadata: Metadata = { title: "Claude Code 辅修教程", description: "53 篇 Claude Code 辅修课程，补充终端工作流与 Claude 生态能力。", alternates: { canonical: "/claude-code" } };

export default function ClaudeIndexPage() {
  return (
    <main className="shell course-page secondary-course">
      <header className="course-hero"><span className="kicker">SECONDARY COURSE · 53 LESSONS</span><h1>Claude Code 辅修</h1><p>完成 Codex 主线后按需选读。重点补齐终端原生体验、Hooks、Agent SDK 与 Claude 生态。</p><div className="course-badge">建议：先掌握 Codex 主线</div></header>
      <div className="course-list">{claudeArticles.map((article) => <CourseCard article={article} key={article.path} />)}</div>
    </main>
  );
}
