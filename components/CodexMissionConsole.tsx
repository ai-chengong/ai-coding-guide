"use client";

import { useEffect, useState } from "react";

const missions = [
  {
    command: 'codex --goal "把想法推进到上线"',
    label: "PRODUCT SHIP",
    steps: ["已读取 AGENTS.md 与项目约束", "已生成可审查的执行计划", "测试通过：92 lessons / 0 broken links", "已发布：coding.aichengong.com"],
  },
  {
    command: 'codex exec "修复问题并补齐回归测试"',
    label: "BUG TO PROOF",
    steps: ["已定位失败链路与相邻消费者", "最小修复已写入工作区", "回归测试与静态检查通过", "变更已整理为可追溯提交"],
  },
  {
    command: 'codex --skills "把重复流程自动化"',
    label: "SYSTEM BUILD",
    steps: ["已发现项目级 Skills 与 MCP", "已拆分安全边界与审批点", "自动化任务已完成自验证", "结果与证据已归档"],
  },
] as const;

export function CodexMissionConsole() {
  const [missionIndex, setMissionIndex] = useState(0);
  const [typed, setTyped] = useState(missions[0].command);
  const [visibleSteps, setVisibleSteps] = useState(missions[0].steps.length);
  const [run, setRun] = useState(0);
  const mission = missions[missionIndex];

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const timers: Array<ReturnType<typeof setTimeout> | ReturnType<typeof setInterval>> = [];
    timers.push(setTimeout(() => {
      setTyped("");
      setVisibleSteps(0);
      let cursor = 0;
      const typing = setInterval(() => {
        cursor += 1;
        setTyped(mission.command.slice(0, cursor));
        if (cursor >= mission.command.length) {
          clearInterval(typing);
          mission.steps.forEach((_, index) => {
            timers.push(setTimeout(() => setVisibleSteps(index + 1), 420 + index * 520));
          });
          timers.push(setTimeout(() => setMissionIndex((current) => (current + 1) % missions.length), 5100));
        }
      }, 38);
      timers.push(typing);
    }, 0));

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, [mission.command, mission.steps, run]);

  return (
    <div className="mission-console" aria-label="Codex Mission Control 动态演示">
      <div className="console-chrome">
        <span className="window-dots" aria-hidden="true"><i /><i /><i /></span>
        <span className="console-title">codex · mission-control</span>
        <button type="button" onClick={() => setRun((value) => value + 1)} aria-label="重播当前 Codex 演示">REPLAY ↻</button>
      </div>
      <div className="mission-head">
        <div><span>ACTIVE MISSION</span><strong>{mission.label}</strong></div>
        <b><i /> LIVE</b>
      </div>
      <div className="mission-command" aria-live="polite"><em>›</em><span>{typed}</span><i aria-hidden="true" /></div>
      <ol className="mission-steps">
        {mission.steps.map((step, index) => (
          <li className={index < visibleSteps ? "is-complete" : ""} key={step}>
            <span>{index < visibleSteps ? "✓" : String(index + 1).padStart(2, "0")}</span>
            <p>{step}</p>
          </li>
        ))}
      </ol>
      <div className="mission-footer"><span>Goal</span><i /><span>Plan</span><i /><span>Build</span><i /><span>Verify</span><i /><span>Ship</span></div>
    </div>
  );
}
