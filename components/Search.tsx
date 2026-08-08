"use client";

import { useMemo, useState } from "react";

export interface SearchRecord {
  path: string;
  title: string;
  description: string;
  course: "codex" | "claude-code";
  number: number;
}

export function Search({ records }: { records: SearchRecord[] }) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase("zh-CN");
    if (!needle) return [];
    return records
      .filter((record) => `${record.title} ${record.description}`.toLocaleLowerCase("zh-CN").includes(needle))
      .slice(0, 10);
  }, [query, records]);

  return (
    <div className="search-panel">
      <label htmlFor="course-search">搜索 92 篇教程</label>
      <div className="search-field">
        <span aria-hidden="true">⌕</span>
        <input
          id="course-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="例如：Goal、Skills、MCP、权限…"
          autoComplete="off"
        />
        <kbd>92 篇</kbd>
      </div>
      {query.trim() ? (
        <div className="search-results" role="region" aria-live="polite">
          {results.length ? results.map((result) => (
            <a href={result.path} key={result.path}>
              <span>{result.course === "codex" ? "Codex" : "Claude"} · {String(result.number).padStart(2, "0")}</span>
              <strong>{result.title.replace(/^\d+\s*[·.、]\s*/, "")}</strong>
            </a>
          )) : <p>没有找到，换个关键词试试。</p>}
        </div>
      ) : null}
    </div>
  );
}
