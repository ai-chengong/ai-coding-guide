import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const courses = ["codex", "claude-code"];

function plainText(value) {
  return value
    .replace(/<[^>]+>/g, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[`*_>#|~-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function slugify(value) {
  return plainText(value)
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72);
}

function descriptionFrom(markdown, title) {
  for (const line of markdown.split("\n")) {
    const text = plainText(line);
    if (
      text.length >= 24 &&
      !line.startsWith("#") &&
      !line.startsWith("![") &&
      !line.startsWith("|") &&
      !line.startsWith("-") &&
      !line.startsWith("```") &&
      !text.includes("系列导航")
    ) {
      return text.slice(0, 150);
    }
  }
  return `${title}——不懂AI的陈工 AI 编程教程。`;
}

function rewriteLinks(markdown, course) {
  return markdown
    .replace(/\]\((?:\.\/)?assets\/([^)"]+)(?:\s+"([^"]+)")?\)/g, (_match, file, title) =>
      `](/${course}/assets/${file}${title ? ` "${title}"` : ""})`,
    )
    .replace(/\]\((?:\.\/)?([0-9]{2}-[^)#]+)\.md(#[^)]+)?\)/g, (_match, slug, hash = "") =>
      `](/${course}/${slug}${hash})`,
    );
}

function addHeadingAnchors(markdown) {
  const used = new Map();
  const toc = [];
  const output = markdown.replace(/^(#{2,3})\s+(.+)$/gm, (_match, hashes, rawText) => {
    const base = slugify(rawText) || "section";
    const count = used.get(base) ?? 0;
    used.set(base, count + 1);
    const id = count === 0 ? base : `${base}-${count + 1}`;
    toc.push({ id, text: plainText(rawText), level: hashes.length });
    return `<span id="${id}" class="heading-anchor"></span>\n\n${hashes} ${rawText}`;
  });
  return { markdown: output, toc };
}

function sanitize(html) {
  return sanitizeHtml(html, {
    allowedTags: [
      ...sanitizeHtml.defaults.allowedTags,
      "img",
      "details",
      "summary",
      "span",
      "kbd",
    ],
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      a: ["href", "name", "target", "rel"],
      img: ["src", "alt", "title", "loading", "width", "height"],
      span: ["id", "class"],
      code: ["class"],
      ol: ["start"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    transformTags: {
      a: (tagName, attribs) => {
        const external = /^https?:\/\//.test(attribs.href ?? "");
        return {
          tagName,
          attribs: external
            ? { ...attribs, target: "_blank", rel: "noopener noreferrer" }
            : attribs,
        };
      },
      img: (tagName, attribs) => ({ tagName, attribs: { ...attribs, loading: "lazy" } }),
    },
  });
}

async function loadCourse(course) {
  const directory = path.join(root, course);
  const files = (await readdir(directory))
    .filter((file) => /^[0-9]{2}-.+\.md$/.test(file))
    .sort((a, b) => a.localeCompare(b, "en"));

  return Promise.all(
    files.map(async (file) => {
      const source = await readFile(path.join(directory, file), "utf8");
      const slug = file.replace(/\.md$/, "");
      const number = Number(slug.slice(0, 2));
      const titleMatch = source.match(/^#\s+(.+)$/m);
      if (!titleMatch) throw new Error(`Missing H1 in ${course}/${file}`);
      const title = plainText(titleMatch[1]);
      const localImages = [...source.matchAll(/!\[[^\]]*\]\((?:\.\/)?assets\/([^)"]+)/g)].map(
        (match) => `/${course}/assets/${match[1]}`,
      );
      const body = rewriteLinks(source.replace(/^#\s+.+\n/, ""), course);
      const anchored = addHeadingAnchors(body);
      const rendered = await marked.parse(anchored.markdown, { gfm: true, breaks: false });

      return {
        course,
        slug,
        number,
        path: `/${course}/${slug}`,
        title,
        description: descriptionFrom(source, title),
        html: sanitize(rendered),
        toc: anchored.toc,
        localImages,
        sourceUrl: `https://github.com/stormzhang/ai-coding-guide/blob/7f493ed018c80d031d3e7a1cd930cfed72af6250/${course}/${file}`,
      };
    }),
  );
}

async function copyPublicAssets() {
  const publicDirectory = path.join(root, "public");
  await mkdir(publicDirectory, { recursive: true });
  for (const course of courses) {
    const target = path.join(publicDirectory, course);
    await rm(target, { recursive: true, force: true });
    await mkdir(target, { recursive: true });
    await cp(path.join(root, course, "assets"), path.join(target, "assets"), { recursive: true });
  }
  await cp(path.join(root, "branding", "og.png"), path.join(publicDirectory, "og.png"));
}

async function writeDiscoveryFiles(articles) {
  const publicDirectory = path.join(root, "public");
  const intro = [
    "# Coding AiChengGong",
    "",
    "> 不懂AI的陈工：Codex 为主、Claude Code 为辅的中文 AI 编程教程。",
    "",
    "- Site: https://coding.aichengong.com",
    "- Source: https://github.com/ai-chengong/ai-coding-guide",
    "- Provenance: https://coding.aichengong.com/sources",
    "- License: https://coding.aichengong.com/license",
    "",
    "## Courses",
    "",
  ];
  const indexLines = articles.map(
    (article) => `- [${article.title}](https://coding.aichengong.com${article.path}): ${article.description}`,
  );
  await writeFile(path.join(publicDirectory, "llms.txt"), `${[...intro, ...indexLines].join("\n")}\n`);

  const fullSections = [
    ...intro,
    "## Full course text",
    "",
    "The following material is adapted from the MIT-licensed upstream baseline identified on the Sources page.",
    "",
  ];
  for (const article of articles) {
    const markdown = await readFile(path.join(root, article.course, `${article.slug}.md`), "utf8");
    fullSections.push(
      "---",
      "",
      `Source URL: ${article.sourceUrl}`,
      `Canonical URL: https://coding.aichengong.com${article.path}`,
      "",
      markdown.trim(),
      "",
    );
  }
  await writeFile(path.join(publicDirectory, "llms-full.txt"), `${fullSections.join("\n")}\n`);
  await writeFile(
    path.join(publicDirectory, "search-index.json"),
    `${JSON.stringify(articles.map(({ path: url, title, description, course, number }) => ({ url, title, description, course, number })), null, 2)}\n`,
  );
}

const articleGroups = await Promise.all(courses.map(loadCourse));
const articles = articleGroups.flat();
const payload = {
  generatedAt: new Date().toISOString(),
  baselineCommit: "7f493ed018c80d031d3e7a1cd930cfed72af6250",
  articles,
};

await mkdir(path.join(root, "generated"), { recursive: true });
await writeFile(path.join(root, "generated", "content.json"), `${JSON.stringify(payload, null, 2)}\n`);
await writeFile(
  path.join(root, "generated", "content.ts"),
  `// Generated by scripts/generate-content.mjs. Do not edit.\nexport const content = ${JSON.stringify(payload)} as const;\n`,
);
await copyPublicAssets();
await writeDiscoveryFiles(articles);
console.log(`Generated ${articles.length} lessons (${articleGroups[0].length} Codex + ${articleGroups[1].length} Claude Code).`);
