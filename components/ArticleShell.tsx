import Link from "next/link";
import { courseLabel, getCourseArticles, type Article } from "@/lib/content";

export function ArticleShell({ article }: { article: Article }) {
  const siblings = getCourseArticles(article.course);
  const index = siblings.findIndex((item) => item.slug === article.slug);
  const previous = index > 0 ? siblings[index - 1] : null;
  const next = index < siblings.length - 1 ? siblings[index + 1] : null;

  return (
    <main className="shell article-layout">
      <aside className="article-rail" aria-label="文章目录">
        <Link className="rail-back" href={`/${article.course}`}>← {courseLabel(article.course)}</Link>
        <div className="rail-progress">
          <span>LESSON</span>
          <strong>{String(article.number).padStart(2, "0")} / {siblings.length}</strong>
        </div>
        <nav>
          {article.toc.slice(0, 16).map((item) => (
            <a className={item.level === 3 ? "toc-child" : ""} href={`#${item.id}`} key={item.id}>{item.text}</a>
          ))}
        </nav>
      </aside>

      <article className="article">
        <header className="article-header">
          <div className="eyebrow"><span>{courseLabel(article.course)}</span><span>第 {article.number} 课</span></div>
          <h1>{article.title}</h1>
          <p>{article.description}</p>
        </header>

        <div className="article-body" dangerouslySetInnerHTML={{ __html: article.html }} />

        <footer className="article-footer">
          <p>工具变化很快：涉及功能、价格和可用范围时，请以官方文档为准。</p>
          <Link className="article-license-link" href="/license">第三方许可</Link>
          <div className="pager">
            {previous ? <Link href={previous.path}><small>上一篇</small><strong>{previous.title}</strong></Link> : <span />}
            {next ? <Link className="pager-next" href={next.path}><small>下一篇</small><strong>{next.title}</strong></Link> : <span />}
          </div>
        </footer>
      </article>
    </main>
  );
}
