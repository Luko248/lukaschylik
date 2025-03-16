# Lukas Chylik Portfolio Website

A personal portfolio website built with Qwik, showcasing skills, services, references, and contact information.

## Prerequisites

- Node.js: `^18.17.0 || ^20.3.0 || >=21.0.0`
- Package Manager: npm or pnpm

## Installation

Clone the repository and install dependencies:

```bash
# Using npm
npm install

# Using pnpm
pnpm install
```

## Development

Start the development server and watch for CSS changes:

```bash
# Using npm
npm start

# Using pnpm
pnpm start
```

This will:

- Format your code
- Start the Vite development server in SSR mode
- Watch for SCSS changes and compile them to CSS

For development server only without formatting:

```bash
# Using npm
npm run dev

# Using pnpm
pnpm dev
```

## Building for Production

Build the application for production:

```bash
# Using npm
npm run build

# Using pnpm
pnpm build
```

## Preview Production Build

Preview the production build locally:

```bash
# Using npm
npm run preview

# Using pnpm
pnpm preview
```

## Project Structure

```
├── public/              # Static assets
│   ├── images/          # Image assets
│   └── ...
├── src/
│   ├── components/      # Reusable UI components
│   ├── routes/          # Page routes and layouts
│   ├── sections/        # Website sections (about, contact, etc.)
│   ├── styles/          # SCSS and CSS styles
│   │   ├── css/         # Compiled CSS
│   │   └── scss/        # SCSS source files
│   └── utils/           # Utility functions
└── ...
```

## Technologies

- [Qwik](https://qwik.dev/) - Frontend framework with resumability
- [Qwik City](https://qwik.dev/qwikcity/overview/) - Meta-framework for Qwik
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [SASS](https://sass-lang.com/) - CSS preprocessor

## Scripts

- `npm start` - Start development server with formatting and CSS watching
- `npm run dev` - Start development server only
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run build:css` - Compile SCSS to CSS
- `npm run format` - Format code with Prettier
- `npm run fmt` - Format all files with Prettier
- `npm run fmt.check` - Check formatting without making changes
