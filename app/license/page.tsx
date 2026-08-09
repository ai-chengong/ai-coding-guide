import type { Metadata } from "next";
import { baselineCommit } from "@/lib/content";

export const metadata: Metadata = { title: "第三方许可", description: "Coding AiChengGong 使用的第三方开源内容与许可证说明。", alternates: { canonical: "/license" } };

export default function LicensePage() {
  return (
    <main className="shell info-page">
      <span className="kicker">LEGAL</span><h1>第三方许可</h1>
      <p>本站主仓库及新增内容由 AiChengGong 持续维护。</p>
      <section className="info-section"><h2>本站仓库</h2><p><a href="https://github.com/ai-chengong/ai-coding-guide">ai-chengong/ai-coding-guide</a></p></section>
      <details className="license-disclosure">
        <summary>查看第三方 MIT 许可信息</summary>
        <p>部分首版课程内容参考自 <a href="https://github.com/stormzhang/ai-coding-guide">stormzhang/ai-coding-guide</a>，采用的可追溯基线为 <a href={`https://github.com/stormzhang/ai-coding-guide/commit/${baselineCommit}`}><code>{baselineCommit}</code></a>。</p>
        <pre className="license-text">{`MIT License

Copyright (c) 2026 stormzhang

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`}</pre>
      </details>
    </main>
  );
}
