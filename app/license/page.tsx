import type { Metadata } from "next";

export const metadata: Metadata = { title: "MIT License", description: "Coding AiChengGong 课程基线的 MIT 许可证与版权说明。", alternates: { canonical: "/license" } };

export default function LicensePage() {
  return (
    <main className="shell info-page">
      <span className="kicker">OPEN SOURCE</span><h1>MIT License</h1>
      <p>允许使用、复制、修改、合并、发布与再授权，但必须在软件的重要副本中保留原版权声明与许可证。</p>
      <section className="info-section"><pre className="license-text">{`MIT License

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
SOFTWARE.`}</pre></section>
      <section className="info-section"><h2>本站新增部分</h2><p>除另有说明外，AiChengGong 新增的站点代码、课程组织与品牌层同样按仓库 MIT License 发布。详见 <a href="https://github.com/ai-chengong/ai-coding-guide">公开仓库</a>。</p></section>
    </main>
  );
}
