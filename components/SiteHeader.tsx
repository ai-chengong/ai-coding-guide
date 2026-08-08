import Link from "next/link";
import { ReadingProgress } from "@/components/ReadingProgress";
import { ThemeToggle } from "@/components/ThemeToggle";

const navItems = [
  ["Codex 主课", "/codex"],
  ["Claude Code", "/claude-code"],
  ["来源", "/sources"],
  ["许可证", "/license"],
] as const;

export function SiteHeader() {
  return (
    <header className="site-header">
      <ReadingProgress />
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label="Coding AiChengGong 首页">
          <span className="brand-mark" aria-hidden="true">AC</span>
          <span>
            <strong>不懂AI的陈工</strong>
            <small>CODING LAB</small>
          </span>
        </Link>
        <nav className="primary-nav" aria-label="主导航">
          {navItems.map(([label, href]) => (
            <Link href={href} key={href}>{label}</Link>
          ))}
        </nav>
        <ThemeToggle />
        <a className="ecosystem-link" href="https://aichengong.com">AiChengGong ↗</a>
      </div>
    </header>
  );
}
