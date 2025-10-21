/**
 * Theme-aware Shiki client-side utilities for dynamic theme switching
 */

import { createHighlighter } from "shiki";
import { SHIKI_CONFIG } from "./shiki-config";

let highlighter: any = null;
let highlighterPromise: Promise<any> | null = null;

/**
 * Initialize Shiki highlighter on the client side
 */
async function initClientHighlighter() {
  if (highlighter) {
    return highlighter;
  }

  if (!highlighterPromise && typeof window !== "undefined") {
    highlighterPromise = createHighlighter(SHIKI_CONFIG).then((hl) => {
      highlighter = hl;
      return hl;
    });
  }
  return highlighterPromise;
}

/**
 * Updates all Shiki code blocks to match the current theme
 */
export async function updateShikiTheme() {
  if (typeof document === "undefined") return;

  try {
    const hl = await initClientHighlighter();
    const codeBlocks = document.querySelectorAll(".shiki-theme-switchable");

    const isDarkMode =
      document.documentElement.style.getPropertyValue("color-scheme") ===
      "dark";

    const theme = isDarkMode ? "github-dark" : "github-light";

    for (const block of codeBlocks) {
      const pre = block as HTMLElement;
      const language = pre.getAttribute("data-language");
      const encodedCode = pre.getAttribute("data-code");

      if (!language || !encodedCode) {
        console.warn("Code block missing data attributes:", {
          language,
          encodedCode,
        });
        continue;
      }

      try {
        const code = decodeURIComponent(encodedCode);
        const html = hl.codeToHtml(code, {
          lang: language,
          theme: theme,
        });

        // Extract the inner content and update
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html;
        const newPre = tempDiv.querySelector("pre");

        if (newPre && pre.parentNode) {
          // Preserve data attributes
          newPre.setAttribute("data-language", language);
          newPre.setAttribute("data-code", encodedCode);
          newPre.classList.add("shiki-theme-switchable");

          pre.parentNode.replaceChild(newPre, pre);
        }
      } catch (error) {
        console.warn(
          `Failed to update theme for code block with language "${language}":`,
          error,
        );
      }
    }
  } catch (error) {
    console.warn("Failed to initialize Shiki highlighter:", error);
  }
}

/**
 * Sets up theme change observer for Shiki code blocks
 */
export function setupShikiThemeObserver() {
  if (typeof document === "undefined") return;

  // Update theme immediately
  updateShikiTheme();

  // Watch for theme changes
  const observer = new MutationObserver(() => {
    updateShikiTheme();
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["style"],
  });

  return observer;
}

// Auto-setup on page load
if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupShikiThemeObserver);
  } else {
    setupShikiThemeObserver();
  }
}
