/**
 * Custom rehype plugin to integrate Shiki syntax highlighting with MDX
 */

import { visit } from "unist-util-visit";
import type { Element, Root } from "hast";
import { highlightCode } from "./shiki";
import { fromHtml } from "hast-util-from-html";

/**
 * JSDoc for rehype Shiki plugin
 * Processes code blocks in MDX and applies Shiki syntax highlighting
 */
export function rehypeShiki() {
  return async (tree: Root) => {
    const promises: Promise<void>[] = [];

    visit(tree, "element", (node: Element) => {
      if (
        node.tagName === "pre" &&
        node.children.length === 1 &&
        node.children[0].type === "element" &&
        node.children[0].tagName === "code"
      ) {
        const codeElement = node.children[0] as Element;
        const className = codeElement.properties?.className as
          | string[]
          | undefined;
        const language =
          className
            ?.find((cls) => cls.startsWith("language-"))
            ?.replace("language-", "") || "text";

        const code = extractTextContent(codeElement);

        if (code.trim()) {
          const promise = highlightCode(code.trim(), language)
            .then((highlightedHtml) => {
              // Parse HTML to HAST and replace the node
              const hastTree = fromHtml(highlightedHtml, { fragment: true });
              if (hastTree.children.length > 0) {
                const preElement = hastTree.children[0] as Element;
                Object.assign(node, preElement);
              }
            })
            .catch((error) => {
              console.warn(`Failed to highlight code block: ${error}`);
            });

          promises.push(promise);
        }
      }
    });

    await Promise.all(promises);
  };
}

/**
 * JSDoc for extracting text content from HAST node
 * Recursively extracts all text content from a HAST element
 */
function extractTextContent(node: any): string {
  if (node.type === "text") {
    return node.value;
  }

  if (node.type === "element" && node.children) {
    return node.children.map(extractTextContent).join("");
  }

  return "";
}

/**
 * JSDoc for parsing HTML to HAST
 * Simple HTML parser to convert Shiki HTML output to HAST nodes
 */
function parseHtmlToHast(html: string): any[] {
  // This is a simplified parser - in production you might want to use a proper HTML parser
  // For now, we'll use a regex-based approach since we control the Shiki output format

  const preMatch = html.match(/<pre[^>]*>(.*?)<\/pre>/);
  if (!preMatch) return [];

  const preContent = preMatch[0];
  const attributes = extractAttributes(preMatch[0]);

  // Extract code content
  const codeMatch = preContent.match(/<code[^>]*>(.*?)<\/code>/);
  if (!codeMatch) return [];

  const codeContent = codeMatch[1];
  const lines = parseLines(codeContent);

  return [
    {
      type: "element",
      tagName: "pre",
      properties: {
        className: attributes.class?.split(" ") || [],
        style: attributes.style || "",
        tabIndex: attributes.tabindex
          ? parseInt(attributes.tabindex)
          : undefined,
        "data-language": attributes["data-language"] || "",
        "data-code": attributes["data-code"] || "",
      },
      children: [
        {
          type: "element",
          tagName: "code",
          properties: {},
          children: lines,
        },
      ],
    },
  ];
}

/**
 * JSDoc for extracting HTML attributes
 * Extracts attributes from HTML tag string
 */
function extractAttributes(html: string): Record<string, string> {
  const attributes: Record<string, string> = {};
  const attrRegex = /(\w+(?:-\w+)*)=["']([^"']*?)["']/g;
  let match;

  while ((match = attrRegex.exec(html)) !== null) {
    attributes[match[1]] = match[2];
  }

  return attributes;
}

/**
 * JSDoc for parsing code lines
 * Parses Shiki-highlighted code lines into HAST nodes
 */
function parseLines(codeContent: string): any[] {
  const lines = codeContent.split(
    /<span class="line"[^>]*>|<\/span>\s*(?=<span class="line"|$)/,
  );
  const result: any[] = [];

  for (let i = 1; i < lines.length; i += 2) {
    const lineContent = lines[i];
    if (lineContent) {
      const spans = parseSpans(lineContent);
      result.push({
        type: "element",
        tagName: "span",
        properties: { className: ["line"] },
        children: spans,
      });
    }
  }

  return result;
}

/**
 * JSDoc for parsing spans
 * Parses individual spans within a code line
 */
function parseSpans(content: string): any[] {
  const spans: any[] = [];
  const spanRegex = /<span[^>]*style="([^"]*)"[^>]*>([^<]*)<\/span>/g;
  let lastIndex = 0;
  let match;

  while ((match = spanRegex.exec(content)) !== null) {
    // Add any text before this span
    if (match.index > lastIndex) {
      const textBefore = content.slice(lastIndex, match.index);
      if (textBefore) {
        spans.push({ type: "text", value: textBefore });
      }
    }

    // Add the span
    spans.push({
      type: "element",
      tagName: "span",
      properties: { style: match[1] },
      children: [{ type: "text", value: match[2] }],
    });

    lastIndex = match.index + match[0].length;
  }

  // Add any remaining text
  if (lastIndex < content.length) {
    const remainingText = content.slice(lastIndex);
    if (remainingText) {
      spans.push({ type: "text", value: remainingText });
    }
  }

  return spans;
}
