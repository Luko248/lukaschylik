import { $, component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Button } from "../button";
import { Icon } from "../icon";
import { updateShikiTheme } from "../../utils/highlight-client";

type Theme = "light" | "dark";

/**
 * Theme toggle button component with simplified logic
 * @returns JSX button element
 */
const ThemeSwitch = component$(() => {
  const currentTheme = useSignal<Theme>("light");

  /**
   * Applies theme to HTML element and updates Shiki code blocks
   */
  const toggleTheme = $(() => {
    if (typeof document === "undefined") return;

    const html = document.querySelector("html");
    if (!html) return;

    currentTheme.value === "dark"
      ? html.style.setProperty("color-scheme", "dark")
      : html.style.setProperty("color-scheme", "light");

    // Update Shiki code blocks to match new theme
    updateShikiTheme();
  });

  /**
   * Initialize theme on page load
   */
  useVisibleTask$(() => {
    if (typeof window === "undefined") return;

    const html = document.querySelector("html");
    if (!html) return;

    const storedTheme = localStorage.getItem("theme") as Theme | null;
    let themeToApply: Theme;

    if (!storedTheme) {
      themeToApply = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    } else {
      themeToApply = storedTheme;
    }

    currentTheme.value = themeToApply;
    html.style.setProperty("color-scheme", themeToApply);

    // Update Shiki code blocks to match initial theme
    updateShikiTheme();
  });

  /**
   * Handles theme toggle on button click
   */
  const handleToggle = $(() => {
    currentTheme.value = currentTheme.value === "dark" ? "light" : "dark";
    localStorage.setItem("theme", currentTheme.value);
    toggleTheme();
  });

  return (
    <Button
      type="button"
      className="text-black dark:text-white p-0"
      onClick$={handleToggle}
      variant="plain"
      aria-label={`Zvolená téma: ${currentTheme.value}. Kliknite pre prepnutie.`}
      title={`Prepni na ${currentTheme.value === "dark" ? "svetlú" : "tmavú"} tému`}>
      <Icon
        name={currentTheme.value === "dark" ? "moon" : "sun"}
        size="1.5rem"
        color="currentColor"
      />
    </Button>
  );
});

export default ThemeSwitch;
