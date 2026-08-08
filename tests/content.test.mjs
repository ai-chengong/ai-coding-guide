import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { test } from "node:test";

async function loadContent() {
  return JSON.parse(await readFile(new URL("../generated/content.json", import.meta.url), "utf8"));
}

test("content bundle contains the complete Codex-first curriculum", async () => {
  const { articles } = await loadContent();
  const codex = articles.filter((article) => article.course === "codex");
  const claude = articles.filter((article) => article.course === "claude-code");

  assert.equal(codex.length, 39);
  assert.equal(claude.length, 53);
  assert.equal(articles[0].course, "codex");
  assert.equal(new Set(articles.map((article) => article.path)).size, 92);
  assert.ok(articles.every((article) => article.title && article.html && article.description));
});

test("all local Markdown images resolve to generated public assets", async () => {
  const { articles } = await loadContent();
  const paths = articles.flatMap((article) => article.localImages);
  assert.ok(paths.length > 0);
  assert.ok(paths.every((path) => path.startsWith(`/${path.split("/")[1]}/assets/`)));
  await Promise.all(paths.map((assetPath) => access(new URL(`../public${assetPath}`, import.meta.url))));
});

test("all rewritten internal lesson links resolve inside the 92-route catalog", async () => {
  const { articles } = await loadContent();
  const validPaths = new Set(articles.map((article) => article.path));
  for (const article of articles) {
    const hrefs = [...article.html.matchAll(/href="(\/(?:codex|claude-code)\/[^"#]+)(?:#[^"]*)?"/g)].map((match) => match[1]);
    for (const href of hrefs) assert.ok(validPaths.has(href), `${article.path} links to missing ${href}`);
    assert.doesNotMatch(article.html, /coding\.stormzhang\.ai/);
  }
});
