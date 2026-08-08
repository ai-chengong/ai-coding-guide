"use client";

const THEME_KEY = "coding-aichengong-theme";

export function ThemeToggle() {
  function toggleTheme() {
    const root = document.documentElement;
    const nextTheme = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = nextTheme;
    root.style.colorScheme = nextTheme;
    window.localStorage.setItem(THEME_KEY, nextTheme);
  }

  return (
    <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label="切换深浅主题" title="切换深浅主题">
      <span className="theme-toggle-track" aria-hidden="true">
        <span className="theme-toggle-sun">☀</span>
        <span className="theme-toggle-moon">☾</span>
        <span className="theme-toggle-thumb" />
      </span>
    </button>
  );
}
