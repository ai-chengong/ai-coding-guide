# Coding AiChengGong

**Codex 为主，Claude Code 为辅**的中文 AI 编程教程。

- 公网课程：<https://coding.aichengong.com>
- AiChengGong 主站：<https://aichengong.com>
- 图形技术情报：<https://graphics.aichengong.com>
- 上游基线：[stormzhang/ai-coding-guide](https://github.com/stormzhang/ai-coding-guide)

## 课程结构

本站首版完整保留 92 篇 MIT 开源内容，并重新组织为 Codex-first 学习路径：

1. **Codex 主课（39 篇）**：桌面端、CLI、Goal、AGENTS.md、权限、Skills、Plugins、MCP、Worktrees、自动化与实战。
2. **Claude Code 辅修（53 篇）**：终端原生工作流、CLAUDE.md、Hooks、Agent SDK 与 Claude 生态。

内容源文件仍是仓库中的 Markdown；站点构建前会生成运行时安全的内容包、搜索索引、静态资源、`llms.txt` 与 `llms-full.txt`。因此文章、站点主题和部署配置彼此分层，后续可以独立修改。

## 来源与版权

本仓库是公开 Fork，首版基线为上游提交：

```text
7f493ed018c80d031d3e7a1cd930cfed72af6250
```

原始版权与 MIT License 保留在 [LICENSE](LICENSE)，详细改编说明见 [NOTICE.md](NOTICE.md)。页面会明确提示：尚未重写的第一人称案例属于上游作者或贡献者，不代表“不懂AI的陈工”的个人经历。

涉及产品功能、价格、命令或安全边界时，优先以 [OpenAI / Codex 官方文档](https://learn.chatgpt.com/docs) 和 [Anthropic / Claude Code 官方文档](https://code.claude.com/docs/zh-CN) 为准。

## 本地开发

需要 Node.js 22.13 或更高版本：

```bash
npm install
npm run dev
```

完整验证：

```bash
npm run lint
npm test
npm run build
```

## 同步上游

`origin` 是 `ai-chengong/ai-coding-guide`，`upstream` 是 `stormzhang/ai-coding-guide`。先获取上游，再通过分支审查合并，避免覆盖 AiChengGong 的品牌与站点代码：

```bash
git fetch upstream
git switch -c chore/sync-upstream-YYYY-MM-DD
git merge upstream/main
npm test
```

出现内容冲突时，以 Markdown 源内容为单位处理；不要直接替换站点代码、`.openai/hosting.json`、`NOTICE.md` 或 AiChengGong 品牌文件。

## 部署

OpenAI Sites 提供公开预览与回退地址，项目 ID 固定记录在 `.openai/hosting.json`。正式域名 `coding.aichengong.com` 由仓库内可追溯的 Cloudflare Worker 直接运行同一份 vinext 构建产物，并通过 Custom Domain 自动管理 DNS 与 HTTPS；架构、部署和迁移边界见 [`docs/deployment/2026-08-08-custom-domain-edge.md`](docs/deployment/2026-08-08-custom-domain-edge.md)。

部署遵循：测试 → 提交并推送 → 保存 Sites 预览版本 → 发布正式 Worker → HTTPS 与未登录访问验收。

## License

[MIT](LICENSE) © 2026 [stormzhang](https://github.com/stormzhang)，AiChengGong 改编与新增代码见 [NOTICE.md](NOTICE.md)。
