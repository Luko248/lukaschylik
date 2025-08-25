import { createHighlighter } from "shiki";

let highlighter: any = null;

/**
 * Initialize Shiki highlighter on the client side
 */
async function initClientHighlighter() {
  if (!highlighter && typeof window !== "undefined") {
    highlighter = await createHighlighter({
      themes: ["github-light", "github-dark"],
      langs: [
        "javascript",
        "typescript",
        "css",
        "html",
        "json",
        "jsx",
        "tsx",
        "bash",
        "python",
        "java",
        "php",
        "go",
        "rust",
        "swift",
        "kotlin",
        "dart",
        "yaml",
        "markdown",
        "sql",
        "xml",
        "scss",
        "sass",
        "vue",
        "svelte",
      ],
    });
  }
  return highlighter;
}

/**
 * Highlight all code blocks on the page
 */
export async function highlightCodeBlocks() {
  if (typeof window === "undefined") return;

  const hl = await initClientHighlighter();
  const codeBlocks = document.querySelectorAll('pre code[class*="language-"]');

  codeBlocks.forEach((block) => {
    const pre = block.parentElement;
    if (!pre || pre.classList.contains("shiki-processed")) return;

    const className = Array.from(block.classList).find((cls) =>
      cls.startsWith("language-"),
    );
    if (!className) return;

    const language = className.replace("language-", "");
    const code = block.textContent || "";

    try {
      // Get current theme (check if dark mode is active)
      const isDarkMode =
        document.documentElement.style.getPropertyValue("color-scheme") ===
          "dark" ||
        document.documentElement.classList.contains("dark") ||
        document.documentElement.getAttribute("data-theme") === "dark" ||
        window.matchMedia("(prefers-color-scheme: dark)").matches;

      const theme = isDarkMode ? "github-dark" : "github-light";
      const html = hl.codeToHtml(code, {
        lang: language,
        theme: theme,
      });

      // Clean up whitespace issues - preserve structure but remove extra spacing
      const cleanHtml = html
        .replace(/>\s+</g, "><") // Remove whitespace between tags
        .replace(/\s+\n/g, "\n") // Remove trailing spaces before newlines
        .replace(/\n\s*\n/g, "\n") // Remove empty lines
        .replace(/^\s+$/gm, "") // Remove lines with only whitespace
        .replace(/\n$/, ""); // Remove final trailing newline

      // Create new element and replace
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = cleanHtml;
      const newPre = tempDiv.querySelector("pre");

      if (newPre) {
        newPre.classList.add("shiki-processed");
        pre.parentNode?.replaceChild(newPre, pre);

        // Set up theme observer to update when theme changes
        const observer = new MutationObserver(() => {
          updateCodeBlockTheme(newPre, hl, code, language);
        });

        observer.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ["class", "data-theme", "style"],
        });

        // Store observer reference for cleanup if needed
        (newPre as any)._themeObserver = observer;
      }
    } catch (error) {
      console.warn(
        `Failed to highlight code with language "${language}":`,
        error,
      );
      pre.classList.add("shiki-processed");
    }
  });
}

/**
 * Update code block theme when theme changes
 */
async function updateCodeBlockTheme(
  pre: Element,
  highlighter: any,
  code: string,
  language: string,
) {
  const isDarkMode =
    document.documentElement.style.getPropertyValue("color-scheme") ===
      "dark" ||
    document.documentElement.classList.contains("dark") ||
    document.documentElement.getAttribute("data-theme") === "dark" ||
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const theme = isDarkMode ? "github-dark" : "github-light";

  try {
    const html = highlighter.codeToHtml(code, {
      lang: language,
      theme: theme,
    });

    // Clean up whitespace
    const cleanHtml = html
      .replace(/>\s+</g, "><") // Remove whitespace between tags
      .replace(/\s+\n/g, "\n") // Remove trailing spaces before newlines
      .replace(/\n\s*\n/g, "\n") // Remove empty lines
      .replace(/^\s+$/gm, "") // Remove lines with only whitespace
      .replace(/\n$/, ""); // Remove final trailing newline

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = cleanHtml;
    const newPre = tempDiv.querySelector("pre");

    if (newPre && pre.parentNode) {
      newPre.classList.add("shiki-processed");
      // Preserve the observer reference
      (newPre as any)._themeObserver = (pre as any)._themeObserver;
      pre.parentNode.replaceChild(newPre, pre);
    }
  } catch (error) {
    console.warn(`Failed to update theme for code block:`, error);
  }
}

// Auto-highlight on page load
if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", highlightCodeBlocks);
  } else {
    highlightCodeBlocks();
  }
}
