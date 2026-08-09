import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "内容与资料", description: "Coding AiChengGong 的公开仓库、官方事实来源与内容维护规则。", alternates: { canonical: "/sources" } };

export default function SourcesPage() {
  return (
    <main className="shell info-page">
      <span className="kicker">AICHENGGONG KNOWLEDGE BASE</span><h1>内容与资料</h1>
      <p>本站由 AiChengGong 仓库持续维护，以 Codex 为主线组织课程，并根据官方资料持续更新。</p>
      <section className="info-section"><h2>本站主仓库</h2><p>公开仓库：<a href="https://github.com/ai-chengong/ai-coding-guide">ai-chengong/ai-coding-guide</a></p><p>本站品牌、课程编排、Codex-first 改编、代码修订和部署均以该仓库为准。</p></section>
      <section className="info-section"><h2>事实核对优先级</h2><div className="source-list"><a href="https://github.com/ai-chengong/ai-coding-guide"><strong>AiChengGong 公开仓库</strong><span>本站品牌、结构、修订和部署的实现真相源</span></a><a href="https://learn.chatgpt.com/docs"><strong>OpenAI / Codex 官方文档</strong><span>Codex 功能、界面、命令、权限、价格和可用范围的最终事实来源</span></a><a href="https://code.claude.com/docs/zh-CN"><strong>Anthropic / Claude Code 官方文档</strong><span>Claude Code 功能、配置、命令和安全边界的最终事实来源</span></a></div></section>
      <section className="info-section"><h2>维护方向</h2><p>后续将逐篇更新过时事实、替换旧案例，并补充 Codex 桌面端、Goal、Sites、可视化与长期任务等新能力。</p></section>
      <p className="third-party-pointer">相关开源内容的版权信息见 <Link href="/license">第三方许可</Link>。</p>
    </main>
  );
}
