import {
  type BundledLanguage,
  type BundledTheme,
  createHighlighter,
  type HighlighterGeneric,
} from 'shiki'
import { SHIKI_CONFIG } from './shiki-config'

let highlighter: HighlighterGeneric<BundledLanguage, BundledTheme> | null = null
let highlighterPromise: Promise<
  HighlighterGeneric<BundledLanguage, BundledTheme>
> | null = null

/**
 * Initialize Shiki highlighter with GitHub themes
 */
export const initHighlighter = async () => {
  if (highlighter) {
    return highlighter
  }

  if (!highlighterPromise) {
    highlighterPromise = createHighlighter(SHIKI_CONFIG).then((hl) => {
      highlighter = hl
      return hl
    })
  }

  return highlighterPromise
}

/**
 * Highlight code with Shiki using GitHub themes - generates single theme that can be dynamically updated
 */
export const highlightCode = async (code: string, language: string) => {
  const hl = await initHighlighter()

  try {
    // Generate HTML with proper inline styles for syntax highlighting
    const html = hl.codeToHtml(code, {
      lang: language as BundledLanguage,
      theme: 'github-light',
    })

    // Add data attributes for theme switching while preserving inline styles
    const htmlWithData = html.replace(
      '<pre class="shiki github-light"',
      '<pre class="shiki github-light shiki-theme-switchable" data-language="' +
        language +
        '" data-code="' +
        encodeURIComponent(code) +
        '"',
    )

    return htmlWithData
  } catch (error) {
    console.warn(`Failed to highlight code with language "${language}":`, error)
    // Fallback to plain code block
    return `<pre><code class="language-${language}">${code}</code></pre>`
  }
}
