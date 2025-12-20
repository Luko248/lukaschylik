# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website built with Qwik framework featuring SSR, a blog with MDX support, and Shiki syntax highlighting. The site is in Slovak language.

## Commands

```bash
# Development (starts Vite + CSS watcher)
bun run start

# Build for production
bun run build

# Preview production build
bun run preview

# Linting & Formatting
bun run biome:check      # Check JS/TS with Biome
bun run biome:lint       # Lint JS/TS
bun run stylelint        # Lint SCSS files
bun run stylelint:fix    # Fix SCSS issues
bun run format           # Format with Biome

# Fix all (runs stylelint:fix + format)
bun run fix

# Type checking
bun run build.types
```

## Architecture

### Framework & Routing
- **Qwik** with **Qwik City** for file-based routing and SSR
- Path alias: `~/` maps to `src/`
- Static adapter in `adapters/static/` for deployment

### Directory Structure
- `src/routes/` - File-based routing (Qwik City convention)
  - `layout.tsx` - Root layout with Navigation, Header, Footer, contexts
  - `blog/articles/` - Blog posts as MDX files with shared layout
- `src/sections/` - Page sections (Header, Footer, About, Services, References, Contact)
- `src/components/` - Reusable UI components
- `src/utils/` - Utilities including markdown processing and Shiki highlighting
- `src/services/` - Business logic services
- `src/styles/scss/` - SCSS organized by: abstracts, base, components, modules, utils

### Blog System
- Blog posts live in `src/routes/blog/articles/{slug}/index.mdx`
- Frontmatter parsed with `gray-matter`
- Code highlighting via Shiki with custom rehype plugin (`src/utils/rehype-shiki.ts`)
- Theme-aware syntax highlighting (light/dark mode observer in `highlight-client.ts`)

### Styling
- **Tailwind CSS 4** + **SCSS** hybrid approach
- SCSS compiles via `sass` to `src/styles/css/index.css`
- Tailwind output goes to `src/styles/css/tailwind.optimized.css`
- Nodemon watches SCSS changes and auto-rebuilds

### Contexts
- `AlertContext` - Global alert/notification system
- `DialogContext` - Reservation dialog management

## Code Conventions

- Use single quotes for strings
- No semicolons (only as needed)
- Add JSDoc for all components, types, and functions
- Maximum 2 nested if conditions per function; split if needed
- Don't create TS/ESLint ignore comments - solve the underlying problem
- Remove unused imports (Biome enforces this)
- No explanatory comments in code; keep custom comments intact
