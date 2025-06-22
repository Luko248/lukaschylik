import { $, component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Button } from "../button";

type Theme = "light" | "dark";

/**
 * Simple theme toggle button component
 * @param props - Component properties
 * @returns JSX button element
 */
const ThemeSwitch = component$(() => {
  const currentTheme = useSignal<Theme>("light");

  /**
   * Applies theme to HTML element and saves to localStorage
   */
  const applyAndSaveTheme = $((theme: Theme) => {
    if (typeof document !== "undefined") {
      const html = document.querySelector("html");
      if (html) {
        html.style.setProperty("color-scheme", theme);
      }
    }

    if (typeof localStorage !== "undefined") {
      localStorage.setItem("theme", theme);
    }
  });

  /**
   * Toggles theme between light and dark
   */
  const toggleTheme = $(() => {
    const newTheme = currentTheme.value === "dark" ? "light" : "dark";
    currentTheme.value = newTheme;
    applyAndSaveTheme(newTheme);
  });

  /**
   * Initialize theme from localStorage or system preference
   */
  useVisibleTask$(() => {
    const storedTheme = (
      typeof localStorage !== "undefined" ? localStorage.getItem("theme") : null
    ) as Theme | null;

    if (storedTheme) {
      currentTheme.value = storedTheme;

      if (typeof document !== "undefined") {
        const html = document.querySelector("html");
        if (html) {
          html.style.setProperty("color-scheme", storedTheme);
        }
      }
      return;
    }

    if (typeof document !== "undefined") {
      const html = document.querySelector("html");
      if (html) {
        html.style.setProperty("color-scheme", currentTheme.value);
      }
    }
  });

  return (
    <Button
      type="button"
      onClick$={toggleTheme}
      variant="plain"
      aria-label={`Current theme: ${currentTheme.value}. Click to toggle theme.`}
      title={`Switch from ${currentTheme.value} theme`}>
      {currentTheme.value === "dark" ? "🌙 Dark" : "☀️ Light"}
    </Button>
  );
});

export default ThemeSwitch;
