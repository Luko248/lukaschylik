import {
  createHighlighter,
  type HighlighterGeneric,
  type BundledLanguage,
  type BundledTheme,
} from "shiki";

let highlighter: HighlighterGeneric<BundledLanguage, BundledTheme> | null =
  null;

/**
 * Initialize Shiki highlighter with GitHub themes
 */
export const initHighlighter = async () => {
  if (!highlighter) {
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
};

/**
 * Highlight code with Shiki using GitHub themes - generates single theme that can be dynamically updated
 */
export const highlightCode = async (code: string, language: string) => {
  const hl = await initHighlighter();

  try {
    // Generate HTML with proper inline styles for syntax highlighting
    const html = hl.codeToHtml(code, {
      lang: language as BundledLanguage,
      theme: "github-light",
    });

    // Add data attributes for theme switching while preserving inline styles
    const htmlWithData = html.replace(
      '<pre class="shiki github-light"',
      '<pre class="shiki github-light shiki-theme-switchable" data-language="' +
        language +
        '" data-code="' +
        encodeURIComponent(code) +
        '"',
    );

    return htmlWithData;
  } catch (error) {
    console.warn(
      `Failed to highlight code with language "${language}":`,
      error,
    );
    // Fallback to plain code block
    return `<pre><code class="language-${language}">${code}</code></pre>`;
  }
};
