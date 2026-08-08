# Coding AiChengGong

[简体中文](README.md) | **English**

A Chinese AI-coding course organized around **Codex as the primary tool** and **Claude Code as a complementary tool**.

- Public site: <https://coding.aichengong.com>
- Source: <https://github.com/ai-chengong/ai-coding-guide>
- Upstream: <https://github.com/stormzhang/ai-coding-guide>

The first release preserves the complete 92-lesson MIT-licensed upstream curriculum: 39 Codex lessons followed by 53 Claude Code lessons. The site adds a Codex-first learning path, search, provenance notices, ecosystem navigation, SEO and LLM-readable exports.

The exact initial upstream baseline is `7f493ed018c80d031d3e7a1cd930cfed72af6250`. The original license and copyright remain in [LICENSE](LICENSE); adaptation details and first-person attribution boundaries are documented in [NOTICE.md](NOTICE.md).

## Development

```bash
npm install
npm run lint
npm test
```

Markdown remains the editable source of truth under `codex/` and `claude-code/`. Build-time generation produces the runtime bundle, assets, search index, `llms.txt`, and `llms-full.txt` without runtime filesystem access.

## License

[MIT](LICENSE) © 2026 [stormzhang](https://github.com/stormzhang), with AiChengGong adaptations described in [NOTICE.md](NOTICE.md).
