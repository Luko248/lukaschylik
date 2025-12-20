/**
 * Custom rehype plugin to integrate Shiki syntax highlighting with MDX
 */

import type { Element, Root } from 'hast'
import { fromHtml } from 'hast-util-from-html'
import { visit } from 'unist-util-visit'
import { highlightCode } from './shiki'

/**
 * JSDoc for rehype Shiki plugin
 * Processes code blocks in MDX and applies Shiki syntax highlighting
 */
export function rehypeShiki() {
  return async (tree: Root) => {
    const promises: Promise<void>[] = []

    visit(tree, 'element', (node: Element) => {
      if (
        node.tagName === 'pre' &&
        node.children.length === 1 &&
        node.children[0].type === 'element' &&
        node.children[0].tagName === 'code'
      ) {
        const codeElement = node.children[0] as Element
        const className = codeElement.properties?.className as
          | string[]
          | undefined
        const language =
          className
            ?.find((cls) => cls.startsWith('language-'))
            ?.replace('language-', '') || 'text'

        const code = extractTextContent(codeElement)

        if (code.trim()) {
          const promise = highlightCode(code.trim(), language)
            .then((highlightedHtml) => {
              // Parse HTML to HAST and replace the node
              const hastTree = fromHtml(highlightedHtml, { fragment: true })
              if (hastTree.children.length > 0) {
                const preElement = hastTree.children[0] as Element
                Object.assign(node, preElement)
              }
            })
            .catch((error) => {
              console.warn(`Failed to highlight code block: ${error}`)
            })

          promises.push(promise)
        }
      }
    })

    await Promise.all(promises)
  }
}

/**
 * JSDoc for extracting text content from HAST node
 * Recursively extracts all text content from a HAST element
 */
function extractTextContent(node: any): string {
  if (node.type === 'text') {
    return node.value
  }

  if (node.type === 'element') {
    if (node.tagName === 'br') {
      return '\n'
    }
    if (node.children) {
      return node.children.map(extractTextContent).join('')
    }
  }

  return ''
}

/**
 * JSDoc for parsing HTML to HAST
 * Simple HTML parser to convert Shiki HTML output to HAST nodes
 */
function _parseHtmlToHast(html: string): any[] {
  // This is a simplified parser - in production you might want to use a proper HTML parser
  // For now, we'll use a regex-based approach since we control the Shiki output format

  const preMatch = html.match(/<pre[^>]*>(.*?)<\/pre>/)
  if (!preMatch) return []

  const preContent = preMatch[0]
  const attributes = extractAttributes(preMatch[0])

  // Extract code content
  const codeMatch = preContent.match(/<code[^>]*>(.*?)<\/code>/)
  if (!codeMatch) return []

  const codeContent = codeMatch[1]
  const lines = parseLines(codeContent)

  return [
    {
      type: 'element',
      tagName: 'pre',
      properties: {
        className: attributes.class?.split(' ') || [],
        style: attributes.style || '',
        tabIndex: attributes.tabindex
          ? parseInt(attributes.tabindex, 10)
          : undefined,
        'data-language': attributes['data-language'] || '',
        'data-code': attributes['data-code'] || '',
      },
      children: [
        {
          type: 'element',
          tagName: 'code',
          properties: {},
          children: lines,
        },
      ],
    },
  ]
}

/**
 * JSDoc for extracting HTML attributes
 * Extracts attributes from HTML tag string
 */
function extractAttributes(html: string): Record<string, string> {
  const attributes: Record<string, string> = {}
  const attrRegex = /(\w+(?:-\w+)*)=["']([^"']*?)["']/g
  let currentMatch: RegExpExecArray | null = attrRegex.exec(html)

  while (currentMatch !== null) {
    attributes[currentMatch[1]] = currentMatch[2]
    currentMatch = attrRegex.exec(html)
  }

  return attributes
}

/**
 * JSDoc for parsing code lines
 * Parses Shiki-highlighted code lines into HAST nodes
 */
function parseLines(codeContent: string): any[] {
  const lines = codeContent.split(
    /<span class="line"[^>]*>|<\/span>\s*(?=<span class="line"|$)/,
  )
  const result: any[] = []

  for (let i = 1; i < lines.length; i += 2) {
    const lineContent = lines[i]
    if (lineContent) {
      const spans = parseSpans(lineContent)
      result.push({
        type: 'element',
        tagName: 'span',
        properties: { className: ['line'] },
        children: spans,
      })
    }
  }

  return result
}

/**
 * JSDoc for parsing spans
 * Parses individual spans within a code line
 */
function parseSpans(content: string): any[] {
  const spans: any[] = []
  const spanRegex = /<span[^>]*style="([^"]*)"[^>]*>([^<]*)<\/span>/g
  let lastIndex = 0
  let currentMatch: RegExpExecArray | null = spanRegex.exec(content)

  while (currentMatch !== null) {
    // Add any text before this span
    if (currentMatch.index > lastIndex) {
      const textBefore = content.slice(lastIndex, currentMatch.index)
      if (textBefore) {
        spans.push({ type: 'text', value: textBefore })
      }
    }

    // Add the span
    spans.push({
      type: 'element',
      tagName: 'span',
      properties: { style: currentMatch[1] },
      children: [{ type: 'text', value: currentMatch[2] }],
    })

    lastIndex = currentMatch.index + currentMatch[0].length

    currentMatch = spanRegex.exec(content)
  }

  // Add any remaining text
  if (lastIndex < content.length) {
    const remainingText = content.slice(lastIndex)
    if (remainingText) {
      spans.push({ type: 'text', value: remainingText })
    }
  }

  return spans
}
