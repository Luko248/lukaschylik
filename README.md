# Lukas Chylik Portfolio Website

A modern personal portfolio website built with **Qwik** featuring server-side rendering (SSR), dynamic blog posts, and optimized performance. The site showcases skills, services, references, and includes a fully functional blog with markdown support.

## Tech Stack

- **[Qwik](https://qwik.dev/)** - Resumable framework with O(1) loading time
- **[Qwik City](https://qwik.dev/qwikcity/overview/)** - Full-stack meta-framework with file-based routing
- **[Vite](https://vitejs.dev/)** - Fast build tool and development server
- **[Bun](https://bun.sh/)** - Fast JavaScript runtime and package manager
- **[TailwindCSS v4](https://tailwindcss.com/blog/tailwindcss-v4-alpha)** - Utility-first CSS framework (latest alpha)
- **[Tailwind Variants](https://tailwind-variants.org/)** - First-class variant API for TailwindCSS
- **[PostCSS](https://postcss.org/)** - CSS transformation tool with plugins ecosystem
- **[PostCSS Preset Env](https://preset-env.cssdb.org/)** - Modern CSS features with automatic polyfills
- **[Autoprefixer](https://autoprefixer.github.io/)** - Automatic vendor prefixing for CSS
- **[Biome](https://biomejs.dev/)** - Fast formatter and linter for JavaScript/TypeScript
- **[Stylelint](https://stylelint.io/)** - CSS/SCSS linter
- **[SASS](https://sass-lang.com/)** - CSS preprocessor
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **SSR Blog Posts** - Server-side rendered markdown blog with frontmatter support

## Live Website

🌐 **[https://lukaschylik.sk/](https://lukaschylik.dev/)** - Production website

## Prerequisites

- **Node.js**: `^18.17.0 || ^20.3.0 || ^22.0.0 || >=24.0.0`
- **Package Manager**: Bun (recommended) or npm/pnpm

## Installation

### Using Bun (Recommended)

```bash
# Clone the repository
git clone <repository-url>
cd lukaschylik

# Install dependencies with Bun
bun install
```

### Using npm/pnpm

```bash
# Clone the repository
git clone <repository-url>
cd lukaschylik

# Using npm
npm install

# Using pnpm
pnpm install
```

## Development

### Start Development Server

```bash
# Full development with formatting and CSS watching (recommended)
bun start

# Development server only
bun run dev

# Using npm
npm start  # or npm run dev

# Using pnpm
pnpm start  # or pnpm dev
```

The `bun start` command will:

- Format styles with Stylelint and code with Biome
- Start Vite development server in SSR mode
- Watch for SCSS changes and compile to CSS
- Open browser automatically

## Building for Production

```bash
# Build for production
bun run build

# Using npm/pnpm
npm run build
pnpm run build
```

## Preview Production Build

```bash
# Preview production build locally
bun run preview

# Using npm/pnpm
npm run preview
pnpm run preview
```

## Code Quality & Formatting

### Format Code

```bash
# Format all files with Biome
bun run biome:format

# Check formatting without changes
bun run biome:check

# Lint with Biome
bun run biome:lint

# CI check (format + lint)
bun run biome:ci
```

### CSS/SCSS Linting

```bash
# Lint styles
bun run stylelint

# Fix style issues automatically
bun run stylelint:fix

# Detailed style check
bun run stylelint:check
```

### Format Everything

```bash
# Fix styles and format code in one command
bun run fix:all
```

## Component Architecture & Styling

### Tailwind Variants

The project uses **[Tailwind Variants](https://tailwind-variants.org/)** for creating reusable component variants with type safety:

```typescript
// Example: Button component variants
import { tv, type VariantProps } from "tailwind-variants";

export const buttonVariants = tv({
  base: [],
  variants: {
    variant: {
      primary: ["btn", "text-transparent"],
      secondary: ["btn", "text-transparent"],
      plain: ["all-[unset]", "cursor-pointer"],
    },
    size: {
      sm: "text-xs",
      md: "text-sm sm:text-base font-bold uppercase",
    },
    iconOnly: {
      true: "p-3",
      false: "",
    },
  },
  compoundVariants: [
    {
      size: "md",
      iconOnly: false,
      class: "px-5 py-3 sm:px-6 sm:py-4 min-w-[180px]",
    },
  ],
  defaultVariants: {
    variant: "primary",
    size: "md",
    iconOnly: false,
  },
});

export type ButtonVariants = VariantProps<typeof buttonVariants>;
```

### Component Structure

Each component follows a consistent structure with variants:

```text
src/components/button/
├── button.tsx          # Main component implementation
├── button.types.ts     # TypeScript interfaces and types
├── button.variants.ts  # Tailwind variants configuration
└── index.ts           # Public exports
```

### Styling System

The project combines multiple styling approaches:

- **TailwindCSS v4** - Utility-first CSS framework with native CSS support
- **Tailwind Variants** - Type-safe component variants with TypeScript integration
- **PostCSS Pipeline** - Advanced CSS processing with modern features
- **SASS/SCSS** - CSS preprocessor for complex styling patterns
- **CSS Custom Properties** - Dynamic theming and responsive design variables

### PostCSS Configuration

The project uses PostCSS for CSS transformation with the following plugins:

- **@tailwindcss/postcss** - TailwindCSS v4 PostCSS plugin with optimizations, nesting, and container queries
- **postcss-preset-env** - Modern CSS features with automatic polyfills (Stage 2 for better browser compatibility)
- **autoprefixer** - Automatic vendor prefixing optimized for modern browsers

Configuration in `postcss.config.js`:

```javascript
export default {
  plugins: {
    "@tailwindcss/postcss": {
      // Enable optimizations for better performance
      optimize: true,
      // Enable CSS nesting support
      nesting: true,
      // Enable container queries
      container: true,
      // Enable modern CSS features
      "future-flags": [
        "no-arbitrary-value-in-hash",
        "deprecate-arbitrary-value-in-hash",
      ],
    },
    "postcss-preset-env": {
      // Use stage 2 for better browser compatibility in 2025
      stage: 2,
      features: {
        "custom-properties": {
          // Preserve custom properties for better CSS variables support
          preserve: true,
        },
        "nesting-rules": true,
        "custom-media-queries": true,
        "media-query-ranges": true,
        "logical-properties-and-values": true,
        "color-functional-notation": true,
        "cascade-layers": true,
      },
      // Modern browser support for 2025
      browsers: [
        "> 1%",
        "last 2 versions",
        "not dead",
        "not ie 11",
        "not op_mini all",
      ],
    },
    autoprefixer: {
      // Modern browser support focusing on current and recent versions
      overrideBrowserslist: [
        "> 1%",
        "last 2 versions",
        "not dead",
        "not ie 11",
        "not op_mini all",
        "not android < 5",
        "not ios < 12",
      ],
      // Optimize for modern browsers - reduce vendor prefixes
      grid: "autoplace",
      // Remove outdated prefixes for better performance
      remove: true,
      // Add prefixes only when needed
      add: true,
      // Support flexbox with modern syntax
      flexbox: "no-2009",
      // Enable cascade for better specificity handling
      cascade: false,
    },
  },
};
```

## Blog Features

The website includes a fully functional blog system with:

- **Markdown Support**: Write blog posts in markdown with frontmatter
- **SSR**: Server-side rendered blog posts for better SEO
- **Code Highlighting**: Prism.js for syntax highlighting (loaded only on blog pages)
- **Dynamic Routing**: File-based routing with Qwik City
- **Blog Progress**: Reading progress indicator on articles

### Adding Blog Posts

Create markdown files in `src/routes/blog/articles/[slug]/index.mdx`:

```markdown
---
title: "Your Blog Post Title"
subtitle: "Optional subtitle"
description: "SEO description"
date: "2025-06-19"
author: "Your Name"
---

# Your Blog Content

Write your blog content here with full markdown support.

\`\`\`typescript
// Code blocks are automatically highlighted
const example = "Hello World";
\`\`\`
```

## Project Structure

```text
├── public/              # Static assets
│   ├── images/          # Image assets
│   └── manifest.json    # PWA manifest
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── button/      # Button component with variants
│   │   │   ├── button.tsx
│   │   │   ├── button.types.ts
│   │   │   ├── button.variants.ts
│   │   │   └── index.ts
│   │   └── ...          # Other components following same pattern
│   ├── routes/          # File-based routing
│   │   ├── blog/        # Blog pages
│   │   │   ├── articles/    # Blog article layouts
│   │   │   └── index.tsx    # Blog listing page
│   │   ├── layout.tsx   # Root layout
│   │   └── index.tsx    # Homepage
│   ├── sections/        # Website sections (about, contact, etc.)
│   ├── styles/          # SCSS and CSS styles
│   │   ├── css/         # Compiled CSS output
│   │   │   └── env.css  # CSS custom properties
│   │   └── scss/        # SCSS source files
│   ├── services/        # Business logic
│   └── utils/           # Utility functions
├── biome.json          # Biome configuration
├── bun.toml           # Bun configuration
├── postcss.config.js  # PostCSS configuration (TailwindCSS v4)
└── vite.config.ts     # Vite configuration
```

## Available Scripts

```bash
# Development
bun start              # Full dev with formatting + CSS watching
bun run dev           # Development server only

# Building
bun run build         # Production build
bun run preview       # Preview production build

# Code Quality
bun run biome:format  # Format code with Biome
bun run biome:lint    # Lint with Biome
bun run biome:check   # Check formatting
bun run biome:ci      # CI check (format + lint)
bun run stylelint     # Lint CSS/SCSS
bun run stylelint:fix # Fix CSS/SCSS issues
bun run fix:all       # Fix styles + format code

# CSS
bun run build:css     # Compile SCSS to CSS
bun run watch:css     # Watch SCSS changes
```

## Performance Features

- **Resumability**: Qwik's unique approach to hydration
- **SSR**: Server-side rendering for better SEO and performance
- **Code Splitting**: Automatic code splitting per route
- **Lazy Loading**: Components load only when needed
- **Optimized CSS**: TailwindCSS v4 with modern features and PostCSS optimization
- **Type-Safe Styling**: Tailwind Variants for component styling with TypeScript support
- **Fast Build**: Vite for lightning-fast development
- **Type Safety**: Full TypeScript support with strict configuration
- **Modern CSS**: SASS/SCSS with CSS custom properties for dynamic theming
