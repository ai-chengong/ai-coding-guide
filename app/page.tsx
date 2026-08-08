import Link from "next/link";
import { CourseCard } from "@/components/CourseCard";
import { Search } from "@/components/Search";
import { articles, claudeArticles, codexArticles } from "@/lib/content";

export default function HomePage() {
  const searchRecords = articles.map(({ path, title, description, course, number }) => ({ path, title, description, course, number }));
  return (
    <main>
      <section className="hero shell">
        <div className="hero-copy">
          <div className="status-pill"><span /> CODEX-FIRST · 持续更新</div>
          <h1>把 AI 编程<br />真正变成<strong>生产力</strong></h1>
          <p>一套面向中文用户的实战教程。以 <b>Codex 为主力</b>，从桌面端、Goal、Skills 到长期任务与自动化；再用 Claude Code 补齐终端工作流。</p>
          <div className="hero-actions">
            <Link className="button primary" href={codexArticles[0].path}>从 Codex 第一课开始 <span>→</span></Link>
            <Link className="button secondary" href="/codex">查看 39 篇目录</Link>
          </div>
        </div>
        <div className="hero-console" aria-label="Codex-first 学习路径">
          <div className="console-top"><i /><i /><i /><span>learning-path.sh</span></div>
          <div className="console-body">
            <p><em>$</em> codex --goal <span>“学会 AI 编程并完成真实项目”</span></p>
            <p className="console-muted">✓ 主工具已选择：Codex</p>
            <p className="console-muted">✓ 辅助工具已选择：Claude Code</p>
            <div className="console-rule" />
            <p><b>01</b> 建立地图：入口、权限与工作模式</p>
            <p><b>02</b> 形成方法：AGENTS.md、Skills、MCP</p>
            <p><b>03</b> 完成项目：测试、Review、自动化、上线</p>
            <p className="console-ready">● READY — 从第 01 课开工</p>
          </div>
        </div>
      </section>

      <section className="stats-strip">
        <div className="shell stats-grid">
          <div><strong>92</strong><span>篇完整教程</span></div>
          <div><strong>39</strong><span>篇 Codex 主课</span></div>
          <div><strong>53</strong><span>篇 Claude Code 辅修</span></div>
          <div><strong>MIT</strong><span>开源、可追溯</span></div>
        </div>
      </section>

      <section className="section shell">
        <div className="section-heading split-heading">
          <div><span className="kicker">START HERE</span><h2>先走 Codex 主线</h2><p>按顺序读，也可以直接搜索手头正在解决的问题。</p></div>
          <Search records={searchRecords} />
        </div>
        <div className="featured-lessons">
          {codexArticles.slice(0, 6).map((article) => <CourseCard article={article} key={article.path} />)}
        </div>
        <Link className="text-link" href="/codex">展开全部 39 篇 Codex 课程 →</Link>
      </section>

      <section className="section course-compare">
        <div className="shell compare-grid">
          <div className="compare-copy"><span className="kicker">ONE METHOD · TWO TOOLS</span><h2>主次分明，互相补位</h2><p>不是二选一。先用 Codex 建立完整的 AI 工程工作流，再把 Claude Code 作为终端原生的辅助工具。</p></div>
          <div className="tool-card tool-primary"><span>PRIMARY</span><h3>Codex</h3><p>桌面端、CLI、IDE、云端与 Goal 长期任务一体化。课程从这里开始。</p><Link href="/codex">39 篇主课 →</Link></div>
          <div className="tool-card"><span>SECONDARY</span><h3>Claude Code</h3><p>强化终端工作流、Hooks、Agent SDK 和 Claude 生态的互补能力。</p><Link href="/claude-code">{claudeArticles.length} 篇辅修 →</Link></div>
        </div>
      </section>

      <section className="section shell path-section">
        <div className="section-heading"><span className="kicker">LEARNING PATHS</span><h2>按你的目标出发</h2></div>
        <div className="path-grid">
          <Link href="/codex/01-what-is-codex"><span>01</span><h3>第一次接触 AI 编程</h3><p>从四种入口、安装与第一个任务开始。</p><b>新手路线 →</b></Link>
          <Link href="/codex/11-agents-md"><span>02</span><h3>把 Codex 用进项目</h3><p>掌握 AGENTS.md、提示词、权限和工作流。</p><b>工程路线 →</b></Link>
          <Link href="/codex/22-skills"><span>03</span><h3>打造自己的 AI 系统</h3><p>进入 Skills、Plugins、自动化与多任务协作。</p><b>进阶路线 →</b></Link>
        </div>
      </section>
    </main>
  );
}
