# Coding AiChengGong Public Site Implementation Plan

> **For Codex:** Execute and verify this plan task-by-task; use Claude Code only as an optional review surface.

**Goal:** Publish `coding.aichengong.com` as a public, Codex-first Chinese AI coding course while preserving a traceable MIT adaptation path to `stormzhang/ai-coding-guide`.

**Architecture:** Keep the upstream Markdown and assets as the editable content truth, then compile article metadata and sanitized HTML into a generated TypeScript module before each build. A vinext/Next-compatible app renders the home page, course indexes, article routes, search index, source/license pages, sitemap, robots, and LLM-readable exports without runtime filesystem access. OpenAI Sites provides a public preview and rollback surface; a versioned Cloudflare Worker Custom Domain runs the same vinext server/client build directly at `coding.aichengong.com` and manages production DNS/TLS. GitHub remains the public source and upstream-sync surface.

**Tech Stack:** TypeScript, React 19, vinext, Next-compatible App Router, Vite, Cloudflare Workers runtime, Marked, sanitize-html, Vitest, Node test runner, OpenAI Sites.

---

### Task 1: Preserve provenance and establish the deployment identity

**Files:**
- Create: `.openai/hosting.json`
- Create: `NOTICE.md`
- Modify: `README.md`
- Verify: `LICENSE`

**Step 1: Record the immutable source baseline**

Record upstream repository URL, baseline commit `7f493ed018c80d031d3e7a1cd930cfed72af6250`, original author, MIT license, and adaptation policy in `NOTICE.md`.

**Step 2: Preserve the upstream license**

Keep `LICENSE` unchanged and verify it still attributes stormzhang.

**Step 3: Describe the fork workflow**

Rewrite `README.md` around Codex-first reading order, local development, production URLs, upstream sync commands, and contribution boundaries.

**Step 4: Verify repository topology**

Run: `git remote -v && git merge-base --is-ancestor 7f493ed018c80d031d3e7a1cd930cfed72af6250 HEAD`

Expected: `origin` points at `ai-chengong`, `upstream` points at `stormzhang`, and the ancestry check exits 0.

### Task 2: Scaffold a buildable Sites application

**Files:**
- Create: `package.json`
- Create: `package-lock.json`
- Create: `tsconfig.json`
- Create: `vite.config.ts`
- Create: `next.config.ts`
- Create: `eslint.config.mjs`
- Create: `postcss.config.mjs`
- Create: `worker/index.ts`
- Create: `build/sites-vite-plugin.ts`

**Step 1: Add pinned dependencies and scripts**

Add `content:generate`, `dev`, `build`, `lint`, and `test` scripts. Make `predev`, `prebuild`, and `pretest` generate the content bundle.

**Step 2: Add the vinext and Sites build adapters**

Configure the RSC and SSR Vite environments for a Cloudflare Worker with no D1 or R2 bindings.

**Step 3: Install dependencies**

Run: `npm install`

Expected: a lockfile is generated with no install failure.

### Task 3: Compile Markdown into a runtime-safe content model

**Files:**
- Create: `scripts/generate-content.mjs`
- Create: `lib/content.ts`
- Generate: `generated/content.ts`
- Test: `tests/content.test.mjs`

**Step 1: Write content-model assertions**

Assert exactly 39 Codex lessons and 53 Claude Code lessons, unique slugs, ascending numeric order, non-empty titles, valid relative assets, and Codex-first aggregate ordering.

**Step 2: Run the test to verify it fails**

Run: `npm test -- --test-name-pattern content`

Expected: FAIL because the generated content module does not yet exist.

**Step 3: Implement deterministic generation**

Read both Markdown directories, derive titles and descriptions, rewrite relative asset paths to public course URLs, render Markdown, sanitize unsafe markup, generate table-of-contents headings, and emit serializable article and search records.

**Step 4: Copy source assets into the public build input**

Generate public asset directories mechanically from `codex/assets`, `claude-code/assets`, and `og.png` without changing source assets.

**Step 5: Run generation and tests**

Run: `npm run content:generate && npm test -- --test-name-pattern content`

Expected: PASS with 92 lessons and all referenced local assets resolved.

### Task 4: Build the Codex-first reading experience

**Files:**
- Create: `app/layout.tsx`
- Create: `app/globals.css`
- Create: `app/page.tsx`
- Create: `app/codex/page.tsx`
- Create: `app/claude-code/page.tsx`
- Create: `app/[course]/[slug]/page.tsx`
- Create: `components/SiteHeader.tsx`
- Create: `components/CourseCard.tsx`
- Create: `components/ArticleShell.tsx`
- Create: `components/Search.tsx`

**Step 1: Implement global brand and navigation**

Use the exact brand name “不懂AI的陈工”, put Codex before Claude Code everywhere, and link Main, News, Graphics, Sources, License, and GitHub.

**Step 2: Implement the home page**

Explain the recommended Codex-first path, show 39 + 53 lesson counts, give beginner/advanced paths, and identify Claude Code as a complementary tool.

**Step 3: Implement course indexes and search**

Render all lessons, progress-friendly numbering, keyboard-accessible search, and no-results feedback.

**Step 4: Implement article navigation and provenance**

Render previous/next navigation, a local table of contents, official-doc reminders, and a visible notice that inherited first-person anecdotes belong to upstream contributors until rewritten.

### Task 5: Add attribution, SEO, and machine-readable outputs

**Files:**
- Create: `app/sources/page.tsx`
- Create: `app/license/page.tsx`
- Create: `app/robots.ts`
- Create: `app/sitemap.ts`
- Create: `app/llms.txt/route.ts`
- Create: `app/llms-full.txt/route.ts`
- Create: `app/search-index.json/route.ts`
- Create: `public/favicon.svg`

**Step 1: Publish source and license pages**

Link upstream repository, exact baseline commit, MIT license, Codex official docs, Claude Code official docs, and the AiChengGong ecosystem.

**Step 2: Publish discovery endpoints**

Include all 92 article URLs in the sitemap and LLM exports; allow public crawling in robots.

**Step 3: Add per-page metadata**

Set canonical URLs under `https://coding.aichengong.com`, Chinese descriptions, and social preview metadata.

### Task 6: Verify locally

**Files:**
- Create: `tests/rendered-html.test.mjs`
- Create: `tests/routes.test.mjs`

**Step 1: Test rendered content**

Assert the home page says Codex is primary, all 92 routes are represented, attribution is visible, ecosystem links are present, and no legacy `coding.stormzhang.ai` canonical links remain outside source attribution.

**Step 2: Lint and build**

Run: `npm run lint && npm test && npm run build`

Expected: all commands exit 0 and the Worker bundle is generated.

**Step 3: Inspect representative pages**

Preview `/`, `/codex/01-what-is-codex`, `/claude-code/01-what-is-claude-code`, `/sources`, `/license`, `/llms.txt`, and `/sitemap.xml` at desktop and mobile widths.

Expected: no layout overflow, broken image, missing navigation, or console error.

### Task 7: Connect the AiChengGong ecosystem and Obsidian truth source

**Files:**
- Modify: sibling `aichengong` repository navigation/product data for Coding links
- Modify: `x-AI-Studio/x30-ai-tech/00_index.md`
- Modify: `x-AI-Studio/x30-ai-tech/03_products/aichengong/README.md`
- Create: `x-AI-Studio/x30-ai-tech/03_products/aichengong/coding.aichengong.com.md`

**Step 1: Add public product links**

Add Coding to the existing Main/News/Graphics ecosystem without redesigning Graphics functionality.

**Step 2: Record repository, domain, source baseline, deployment, and maintenance flow in Obsidian**

Use the required Obsidian CLI skills, preserve existing frontmatter conventions, and validate links after writing.

### Task 8: Publish and prove the public domain

**Files:**
- Modify: `.openai/hosting.json` only if Sites returns additional non-secret bindings
- Create: `infra/domain-edge/wrangler.jsonc`
- Create: `tests/domain-edge.test.mjs`
- Create: `docs/deployment/2026-08-08-custom-domain-edge.md`

**Step 1: Commit and push GitHub source**

Run: `git status --short && git add <intended paths> && git commit && git push origin`

Expected: GitHub contains the exact tested commit.

**Step 2: Push the same commit to the Sites source repository**

Use the short-lived credential per command without storing it, and verify the remote commit SHA.

**Step 3: Save and deploy a public Sites preview version**

Save the pushed commit, deploy it, set site access to public, and wait for terminal success.

**Step 4: Publish `coding.aichengong.com`**

Publish the tested vinext server and client assets directly through a Cloudflare Worker Custom Domain. The production runtime must build before deployment and let Cloudflare create the hostname DNS record and certificate as one managed operation. Keep the generated Sites hostname as the public preview, and remove the unused pending direct-Sites custom-domain attachment after production passes acceptance checks.

**Step 5: Perform unauthenticated acceptance checks**

Run HTTP checks for representative pages and endpoints with no session cookies.

Expected: HTTPS returns 200, certificate matches `coding.aichengong.com`, canonical URLs are correct, article images load, and public navigation links resolve.

**Step 6: Complete the audit**

Compare repository state, deployment state, DNS, TLS, public HTTP responses, article counts, content provenance, ecosystem links, and Obsidian records against the goal before marking it complete.
