import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://coding.aichengong.com"),
  title: { default: "Coding AiChengGong｜Codex 中文教程", template: "%s｜不懂AI的陈工" },
  description: "Codex 为主、Claude Code 为辅的中文 AI 编程教程：92 篇，从安装、工作流到 Skills、MCP、自动化与实战。",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: "Coding AiChengGong",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Coding AiChengGong" }],
  },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <SiteHeader />
        {children}
        <footer className="site-footer">
          <div className="shell footer-grid">
            <div><strong>不懂AI的陈工</strong><p>保持好奇，边做边学。Codex 主力执行，Claude Code 辅助协作。</p></div>
            <div><span>ECOSYSTEM</span><a href="https://aichengong.com">主站</a><a href="https://news.aichengong.com">News</a><a href="https://graphics.aichengong.com">Graphics</a></div>
            <div><span>OPEN SOURCE</span><a href="https://github.com/ai-chengong/ai-coding-guide">GitHub</a><Link href="/sources">来源说明</Link><Link href="/license">MIT License</Link></div>
          </div>
        </footer>
      </body>
    </html>
  );
}
