"use client";
import { useTheme } from "next-themes";
import styles from "./Portfolio.module.css";
export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <button
      type="button"
      className={styles.themeToggle}
      aria-label="Toggle light and dark theme"
      title="Toggle light and dark theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <svg
        className="theme-sun"
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
      </svg>
      <svg
        className="theme-moon"
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M20 14A8 8 0 0 1 10 4a8 8 0 1 0 10 10Z" />
      </svg>
    </button>
  );
}
