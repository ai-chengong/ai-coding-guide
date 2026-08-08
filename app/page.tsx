import Link from "next/link";
import type { CSSProperties } from "react";
import { CodexMissionConsole } from "@/components/CodexMissionConsole";
import { CourseCard } from "@/components/CourseCard";
import { RevealController } from "@/components/RevealController";
import { Search } from "@/components/Search";
import { articles, claudeArticles, codexArticles } from "@/lib/content";

const systemSteps = [
  ["01", "读懂现场", "让 Codex 先读取项目、规则与失败证据，不从猜测开始。"],
  ["02", "形成计划", "把目标拆成可验证步骤，明确权限、风险与完成条件。"],
  ["03", "并行推进", "用 Skills、MCP、Worktrees 和自动化，把方法变成系统。"],
  ["04", "证据收口", "构建、测试、Review、上线；结果能被打开，也能被复核。"],
] as const;

export default function HomePage() {
  const searchRecords = articles.map(({ path, title, description, course, number }) => ({ path, title, description, course, number }));

  return (
    <main className="home-page">
      <RevealController />

      <section className="hero shell">
        <div className="hero-atmosphere" aria-hidden="true">
          <span className="hero-grid" />
          <span className="hero-orb hero-orb-a" />
          <span className="hero-orb hero-orb-b" />
          <span className="hero-scan" />
        </div>
        <div className="hero-copy">
          <div className="status-pill"><span /> CODEX-FIRST · 92 LESSONS · 持续更新</div>
          <h1>让 Codex 把想法<br /><strong>推进到上线</strong></h1>
          <p>一套面向中文用户的 AI 编程实战系统。以 <b>Codex 为主力</b>，从第一次对话走到 Goal、Skills、MCP、长期任务与自动化；Claude Code 负责补位。</p>
          <div className="hero-actions">
            <Link className="button primary" href={codexArticles[0].path}>启动 Codex 第一课 <span>→</span></Link>
            <Link className="button secondary" href="/codex">查看 39 篇主线</Link>
          </div>
          <div className="hero-proof" aria-label="课程特性">
            <span><i />39 篇 Codex 主课</span>
            <span><i />MIT 可追溯</span>
            <span><i />项目级实战</span>
          </div>
        </div>
        <div className="hero-console-wrap">
          <span className="console-orbit" aria-hidden="true" />
          <CodexMissionConsole />
        </div>
      </section>

      <section className="signal-strip" aria-label="核心课程关键词">
        <div className="signal-track">
          <span>CODEX APP</span><i />
          <span>GOAL MODE</span><i />
          <span>AGENTS.MD</span><i />
          <span>SKILLS</span><i />
          <span>MCP</span><i />
          <span>WORKTREES</span><i />
          <span>AUTOMATION</span><i />
          <span>SHIP WITH PROOF</span><i />
          <span aria-hidden="true">CODEX APP</span><i aria-hidden="true" />
          <span aria-hidden="true">GOAL MODE</span><i aria-hidden="true" />
          <span aria-hidden="true">AGENTS.MD</span><i aria-hidden="true" />
          <span aria-hidden="true">SKILLS</span><i aria-hidden="true" />
        </div>
      </section>

      <section className="stats-strip" data-reveal>
        <div className="shell stats-grid">
          <div><strong>92</strong><span>篇完整教程</span></div>
          <div><strong>39</strong><span>篇 Codex 主课</span></div>
          <div><strong>53</strong><span>篇 Claude Code 辅修</span></div>
          <div><strong>MIT</strong><span>开源、可追溯</span></div>
        </div>
      </section>

      <section className="section shell course-start" data-reveal>
        <div className="section-heading split-heading">
          <div><span className="kicker">START WITH CODEX</span><h2>先建立主线，<br />再扩展工具。</h2><p>按顺序读，也可以搜索你现在正在解决的问题。</p></div>
          <Search records={searchRecords} />
        </div>
        <div className="featured-lessons">
          {codexArticles.slice(0, 6).map((article) => <CourseCard article={article} key={article.path} />)}
        </div>
        <Link className="text-link" href="/codex">进入全部 39 篇 Codex 课程 <span>→</span></Link>
      </section>

      <section className="section system-section">
        <div className="shell" data-reveal>
          <div className="section-heading system-heading"><span className="kicker">FROM PROMPT TO PROOF</span><h2>不是学会几个命令，<br />而是建立一套交付系统。</h2><p>参考站展示工具，我们更进一步：把学习路线做成从问题到证据的完整闭环。</p></div>
          <div className="system-map">
            <span className="system-line" aria-hidden="true" />
            {systemSteps.map(([number, title, description], index) => (
              <article className="system-node" key={number} style={{ "--step": index } as CSSProperties}>
                <span className="system-index">{number}</span>
                <i aria-hidden="true" />
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section course-compare" data-reveal>
        <div className="shell compare-grid">
          <div className="compare-copy"><span className="kicker">ONE SYSTEM · TWO TOOLS</span><h2>主次分明，<br />互相补位。</h2><p>不是二选一。先用 Codex 建立完整的 AI 工程工作流，再把 Claude Code 作为终端原生的辅助工具。</p></div>
          <Link className="tool-card tool-primary" href="/codex">
            <span>PRIMARY · 39 LESSONS</span><div className="tool-glyph" aria-hidden="true">C</div><h3>Codex</h3><p>桌面端、CLI、IDE、云端、Goal、Skills 与长期自动化一体化。</p><b>从主课开始 →</b>
          </Link>
          <Link className="tool-card tool-secondary" href="/claude-code">
            <span>SECONDARY · {claudeArticles.length} LESSONS</span><div className="tool-glyph" aria-hidden="true">CC</div><h3>Claude Code</h3><p>补齐终端工作流、Hooks、Agent SDK 和 Claude 生态。</p><b>按需辅修 →</b>
          </Link>
        </div>
      </section>

      <section className="section shell path-section" data-reveal>
        <div className="section-heading path-heading"><span className="kicker">CHOOSE YOUR ENTRY</span><h2>今天就从一个真实目标出发。</h2><p>三条路线最终汇合到同一件事：让 AI 编程真正进入你的项目。</p></div>
        <div className="path-grid">
          <Link href="/codex/01-what-is-codex"><span>01 / BEGINNER</span><h3>第一次接触 AI 编程</h3><p>从四种入口、安装与第一个任务开始。</p><b>走新手路线 →</b></Link>
          <Link href="/codex/11-agents-md"><span>02 / ENGINEER</span><h3>把 Codex 用进项目</h3><p>掌握 AGENTS.md、提示词、权限和工作流。</p><b>走工程路线 →</b></Link>
          <Link href="/codex/22-skills"><span>03 / SYSTEM</span><h3>打造自己的 AI 系统</h3><p>进入 Skills、Plugins、MCP、自动化与多任务协作。</p><b>走进阶路线 →</b></Link>
        </div>
      </section>

      <section className="closing-cta" data-reveal>
        <div className="shell closing-grid">
          <div><span className="kicker">READY TO BUILD</span><h2>把下一次“试试看”，<br />变成一次真正的交付。</h2></div>
          <div><p>从第 01 课开始，带着一个真实项目一路往前。</p><Link className="button primary" href={codexArticles[0].path}>开始学习 <span>→</span></Link></div>
        </div>
      </section>
    </main>
  );
}
