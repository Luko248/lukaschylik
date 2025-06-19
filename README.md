# Lukas Chylik Portfolio Website

A modern personal portfolio website built with **Qwik** featuring server-side rendering (SSR), dynamic blog posts, and optimized performance. The site showcases skills, services, references, and includes a fully functional blog with markdown support.

## Tech Stack

- **[Qwik](https://qwik.dev/)** - Resumable framework with O(1) loading time
- **[Qwik City](https://qwik.dev/qwikcity/overview/)** - Full-stack meta-framework with file-based routing
- **[Vite](https://vitejs.dev/)** - Fast build tool and development server
- **[Bun](https://bun.sh/)** - Fast JavaScript runtime and package manager
- **[TailwindCSS v4](https://tailwindcss.com/blog/tailwindcss-v4-alpha)** - Utility-first CSS framework (latest alpha)
- **[Biome](https://biomejs.dev/)** - Fast formatter and linter for JavaScript/TypeScript
- **[Stylelint](https://stylelint.io/)** - CSS/SCSS linter
- **[SASS](https://sass-lang.com/)** - CSS preprocessor
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **SSR Blog Posts** - Server-side rendered markdown blog with frontmatter support

## Prerequisites

- **Node.js**: `^18.17.0 || ^20.3.0 || >=21.0.0`
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

- Format code with Biome
- Fix SCSS/CSS with Stylelint
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
│   ├── routes/          # File-based routing
│   │   ├── blog/        # Blog pages
│   │   │   ├── articles/    # Blog article layouts
│   │   │   └── index.tsx    # Blog listing page
│   │   ├── layout.tsx   # Root layout
│   │   └── index.tsx    # Homepage
│   ├── sections/        # Website sections (about, contact, etc.)
│   ├── styles/          # SCSS and CSS styles
│   │   ├── css/         # Compiled CSS
│   │   └── scss/        # SCSS source files
│   ├── services/        # Business logic
│   └── utils/           # Utility functions
├── biome.json          # Biome configuration
├── bun.toml           # Bun configuration
├── tailwind.config.js # Tailwind configuration
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
- **Optimized CSS**: TailwindCSS v4 with modern features
- **Fast Build**: Vite for lightning-fast development
- **Type Safety**: Full TypeScript support
