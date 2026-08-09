import assert from "node:assert/strict";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);
const runtimeEnv = { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } };
const ctx = { waitUntil() {}, passThroughOnException() {} };

async function request(path, accept = "text/html") {
  return worker.fetch(new Request(`http://localhost${path}`, { headers: { accept } }), runtimeEnv, ctx);
}

test("renders a public Codex-first home page with ecosystem links", async () => {
  const response = await request("/");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>Coding AiChengGong｜Codex 中文教程<\/title>/);
  assert.match(html, /CODEX-FIRST/);
  assert.match(html, /Codex 为主力/);
  assert.match(html, /Codex Mission Control/);
  assert.match(html, /GRAPHICS TRACE/);
  assert.match(html, /分析 Android 图形闪烁并形成证据闭环/);
  assert.match(html, /graphics\.aichengong\.com/);
  assert.match(html, /切换深浅主题/);
  assert.match(html, /Goal[\s\S]*Plan[\s\S]*Build[\s\S]*Verify[\s\S]*Ship/);
  assert.match(html, /data-theme="dark"/);
  assert.doesNotMatch(html, /prefers-color-scheme/);
  assert.match(html, /og-mission-control\.png/);
  assert.match(html, /39[\s\S]*Codex 主课/);
  assert.match(html, /53[\s\S]*Claude Code 辅修/);
  assert.match(html, /https:\/\/aichengong\.com/);
  assert.match(html, /https:\/\/graphics\.aichengong\.com/);
  assert.match(html, /https:\/\/github\.com\/ai-chengong\/ai-coding-guide/);
  assert.doesNotMatch(html, /href="\/sources"/);
});

test("presents AiChengGong as the site repository without foregrounding third-party details", async () => {
  const response = await request("/sources");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /本站主仓库/);
  assert.match(html, /ai-chengong\/ai-coding-guide/);
  assert.doesNotMatch(html, /stormzhang\/ai-coding-guide/);
  assert.match(html, /href="\/license"/);
});

test("keeps third-party attribution compact at the end of representative lessons", async () => {
  for (const path of ["/codex/01-what-is-codex", "/claude-code/01-what-is-claude-code"]) {
    const response = await request(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.doesNotMatch(html, /可追溯改编说明/);
    assert.doesNotMatch(html, /github\.com\/stormzhang\/ai-coding-guide\/blob\/7f493ed/);
    assert.match(html, /class="article-license-link"/);
    assert.match(html, /href="\/license"/);
  }
});

test("keeps the complete upstream notice inside one collapsed license disclosure", async () => {
  const response = await request("/license");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<details class="license-disclosure">/);
  assert.match(html, /stormzhang\/ai-coding-guide/);
  assert.match(html, /Copyright \(c\) 2026 stormzhang/);
  assert.match(html, /The above copyright notice and this permission notice shall be included/);
});

test("serves SEO routes for all 92 lessons", async () => {
  const robots = await request("/robots.txt", "text/plain");
  assert.equal(robots.status, 200);
  assert.match(await robots.text(), /Sitemap: https:\/\/coding\.aichengong\.com\/sitemap\.xml/);

  const sitemap = await request("/sitemap.xml", "application/xml");
  assert.equal(sitemap.status, 200);
  const xml = await sitemap.text();
  assert.match(xml, /coding\.aichengong\.com\/codex\/01-what-is-codex/);
  assert.match(xml, /coding\.aichengong\.com\/claude-code\/53-remotion-video/);
  assert.equal((xml.match(/<url>/g) ?? []).length, 97);
});
