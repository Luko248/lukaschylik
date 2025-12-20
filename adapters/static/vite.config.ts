import { qwikVite } from '@builder.io/qwik/optimizer'
import { staticAdapter } from '@builder.io/qwik-city/adapters/static/vite'
import { qwikCity } from '@builder.io/qwik-city/vite'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { rehypeShiki } from '../../src/utils/rehype-shiki'

export default defineConfig({
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
    staticAdapter({
      origin: 'https://lukaschylik.dev',
      maxWorkers: 1,
    }),
  ],
  build: {
    ssr: true,
    target: 'esnext',
    rollupOptions: {
      input: ['@qwik-city-plan'],
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        manualChunks: {
          vendor: ['@builder.io/qwik', '@builder.io/qwik-city'],
        },
      },
    },
  },
  optimizeDeps: {
    exclude: [],
  },
})
