/**
 * Base Vite configuration for Qwik application with SSR support
 */

import { qwikVite } from '@builder.io/qwik/optimizer'
import { qwikCity } from '@builder.io/qwik-city/vite'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { defineConfig, type UserConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import pkg from './package.json'
import { rehypeShiki } from './src/utils/rehype-shiki'

interface PackageJson {
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
  [key: string]: unknown
}

const { dependencies = {}, devDependencies = {} } = pkg as PackageJson
errorOnDuplicatesPkgDeps(devDependencies, dependencies)

export default defineConfig((): UserConfig => {
  return {
    plugins: [
      qwikCity({
        mdxPlugins: {
          remarkGfm: false,
          rehypeSyntaxHighlight: false,
          rehypeAutolinkHeadings: false,
        },
        mdx: {
          rehypePlugins: [
            rehypeShiki,
            [
              rehypeAutolinkHeadings,
              {
                behavior: 'wrap',
                properties: {
                  className: ['heading-anchor'],
                  tabIndex: 0,
                },
              },
            ],
          ],
        },
      }),
      qwikVite(),
      tsconfigPaths(),
    ],
    css: {
      preprocessorOptions: {
        scss: {},
      },
    },
    optimizeDeps: {
      exclude: [],
    },
    build: {
      target: 'esnext',
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name]-[hash][extname]',
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
        },
      },
    },
    server: {
      headers: {
        'Cache-Control': 'public, max-age=0',
      },
    },
    preview: {
      headers: {
        'Cache-Control': 'public, max-age=600',
      },
    },
  }
})

/**
 * Validates that dependencies are not duplicated between devDependencies and dependencies
 * @param devDependencies - Development dependencies
 * @param dependencies - Production dependencies
 */
function errorOnDuplicatesPkgDeps(
  devDependencies: Record<string, string>,
  dependencies: Record<string, string>,
) {
  let msg = ''

  const duplicateDeps = Object.keys(devDependencies).filter(
    (dep) => dependencies[dep],
  )

  const qwikPkg = Object.keys(dependencies).filter((value) =>
    /qwik/i.test(value),
  )

  msg = `Move qwik packages ${qwikPkg.join(', ')} to devDependencies`

  if (qwikPkg.length > 0) {
    throw new Error(msg)
  }

  msg = `
    Warning: The dependency "${duplicateDeps.join(', ')}" is listed in both "devDependencies" and "dependencies".
    Please move the duplicated dependencies to "devDependencies" only and remove it from "dependencies"
  `

  if (duplicateDeps.length > 0) {
    throw new Error(msg)
  }
}
