import type { Metadata } from "next";
import Link from "next/link";
import { baselineCommit } from "@/lib/content";

export const metadata: Metadata = { title: "内容来源与改编说明", description: "Coding AiChengGong 的开源基线、官方事实来源与内容维护规则。", alternates: { canonical: "/sources" } };

export default function SourcesPage() {
  return (
    <main className="shell info-page">
      <span className="kicker">TRACEABLE BY DESIGN</span><h1>内容来源</h1>
      <p>本站由 AiChengGong 仓库持续维护。首版内容以可追溯的 Markdown 快照为起点，同时保留上游来源、许可证和精确基线；不抓取网页 HTML，也不把原作者的个人经历冒充为本站作者经历。</p>
      <section className="info-section"><h2>本站主仓库</h2><p>公开仓库：<a href="https://github.com/ai-chengong/ai-coding-guide">ai-chengong/ai-coding-guide</a></p><p>本站品牌、课程编排、Codex-first 改编、代码修订和部署均以该仓库为准。</p></section>
      <section className="info-section"><h2>上游内容基线</h2><p>首版参考项目：<a href="https://github.com/stormzhang/ai-coding-guide">stormzhang/ai-coding-guide</a></p><p>采用的基线提交：<a href={`https://github.com/stormzhang/ai-coding-guide/commit/${baselineCommit}`}><code>{baselineCommit}</code></a></p><p>许可证：MIT。原始版权声明完整保留在仓库的 <Link href="/license">许可证页面</Link>。</p></section>
      <section className="info-section"><h2>事实核对优先级</h2><div className="source-list"><a href="https://github.com/ai-chengong/ai-coding-guide"><strong>AiChengGong 公开仓库</strong><span>本站品牌、结构、修订和部署的实现真相源</span></a><a href="https://learn.chatgpt.com/docs"><strong>OpenAI / Codex 官方文档</strong><span>Codex 功能、界面、命令、权限、价格和可用范围的最终事实来源</span></a><a href="https://code.claude.com/docs/zh-CN"><strong>Anthropic / Claude Code 官方文档</strong><span>Claude Code 功能、配置、命令和安全边界的最终事实来源</span></a></div></section>
      <section className="info-section"><h2>改编边界</h2><p>首版优先保证完整可用，后续将逐篇更新过时事实、替换个人化案例并补充 Codex 桌面端、Goal、Sites、可视化与长期任务等新能力。每篇文章均链接到对应基线源文件。</p></section>
    </main>
  );
}
