import type { Element, ElementContent, Root } from 'hast'
import { visit } from 'unist-util-visit'
import portfolioData from '../components/icon/portfolio.json'

/**
 * Supported heading tags that should receive a copy-link control.
 */
const COPYABLE_HEADING_TAGS = new Set(['h2', 'h3', 'h4', 'h5', 'h6'])

/**
 * Source SVG used for the copy-link icon.
 */
const HEADING_LINK_ICON = readHeadingLinkIcon()

/**
 * Icon selection entry in the portfolio icon JSON.
 */
interface PortfolioSelection {
  /** Icon name. */
  name: string
}

/**
 * Icon geometry entry in the portfolio icon JSON.
 */
interface PortfolioIcon {
  /** SVG paths used to render the icon. */
  paths: string[]
  /** Source icon grid size. */
  grid: number
}

/**
 * Portfolio icon data shape.
 */
interface PortfolioData {
  /** Ordered icon name definitions. */
  selection: PortfolioSelection[]
  /** Ordered SVG geometry definitions. */
  icons: PortfolioIcon[]
}

/**
 * Rehype plugin that appends a copy-link control to copyable headings.
 */
export function rehypeHeadingAnchor() {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element) => {
      if (!isCopyableHeading(node)) {
        return
      }

      const headingId = getHeadingId(node)
      if (!headingId) {
        return
      }

      const headingChildren = [...node.children]

      node.properties = appendClassName(node.properties, 'heading-with-anchor')
      node.children = [
        createHeadingTextNode(headingChildren),
        createHeadingCopyAnchor(headingId),
      ]
    })
  }
}

/**
 * Returns whether the current node is a supported heading.
 */
function isCopyableHeading(node: Element): boolean {
  return COPYABLE_HEADING_TAGS.has(node.tagName)
}

/**
 * Reads the heading ID from the current heading node.
 */
function getHeadingId(node: Element): string | null {
  const headingId = node.properties?.id

  if (typeof headingId === 'string' && headingId.length > 0) {
    return headingId
  }

  return null
}

/**
 * Adds a class name to an existing HAST properties object.
 */
function appendClassName(
  properties: Element['properties'],
  className: string,
): Element['properties'] {
  const currentClassName = properties?.className
  const normalizedClassNames = Array.isArray(currentClassName)
    ? [...currentClassName]
    : typeof currentClassName === 'string'
      ? [currentClassName]
      : []

  if (!normalizedClassNames.includes(className)) {
    normalizedClassNames.push(className)
  }

  return {
    ...properties,
    className: normalizedClassNames,
  }
}

/**
 * Creates a wrapper node for the heading text content.
 */
function createHeadingTextNode(children: ElementContent[]): Element {
  return {
    type: 'element',
    tagName: 'span',
    properties: {
      className: ['heading-anchor__text'],
    },
    children,
  }
}

/**
 * Creates the copy-link anchor that is appended to each heading.
 */
function createHeadingCopyAnchor(headingId: string): Element {
  return {
    type: 'element',
    tagName: 'a',
    properties: {
      href: `#${headingId}`,
      className: ['heading-anchor-copy'],
      dataCopyHeading: headingId,
      title: 'Skopírovať odkaz na sekciu',
      ariaLabel: 'Skopírovať odkaz na sekciu',
    },
    children: [createHeadingCopyIcon()],
  }
}

/**
 * Creates the inline SVG node used inside the copy-link anchor.
 */
function createHeadingCopyIcon(): Element {
  return {
    type: 'element',
    tagName: 'svg',
    properties: {
      className: ['heading-anchor-copy__icon'],
      viewBox: HEADING_LINK_ICON.viewBox,
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg',
      ariaHidden: 'true',
      focusable: 'false',
    },
    children: HEADING_LINK_ICON.paths.map((pathValue) => ({
      type: 'element',
      tagName: 'path',
      properties: {
        d: pathValue,
        fill: 'currentColor',
      },
      children: [],
    })),
  }
}

/**
 * Reads the link icon source embedded in the portfolio icon JSON.
 */
function readHeadingLinkIcon(): { paths: string[]; viewBox: string } {
  const { selection, icons } = portfolioData as PortfolioData
  const linkIconIndex = selection.findIndex((icon) => icon.name === 'link')
  const linkIcon = icons[linkIconIndex]

  if (linkIconIndex === -1 || !linkIcon) {
    throw new Error('The "link" icon is missing from portfolio.json.')
  }

  return {
    paths: linkIcon.paths.map((pathValue) =>
      pathValue.replace(/\s+/g, ' ').trim(),
    ),
    viewBox: `0 0 ${linkIcon.grid} ${linkIcon.grid}`,
  }
}
