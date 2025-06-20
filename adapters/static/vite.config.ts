import { qwikVite } from "@builder.io/qwik/optimizer";
import { staticAdapter } from "@builder.io/qwik-city/adapters/static/vite";
import { qwikCity } from "@builder.io/qwik-city/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    qwikCity({
      mdxPlugins: {
        remarkGfm: true,
        rehypeSyntaxHighlight: true,
        rehypeAutolinkHeadings: true,
      },
    }),
    qwikVite(),
    tsconfigPaths(),
    staticAdapter({
      origin: "https://lukaschylik.sk",
    }),
  ],
  build: {
    ssr: true,
    target: "esnext",
    rollupOptions: {
      input: ["@qwik-city-plan"],
      output: {
        assetFileNames: "assets/[name]-[hash][extname]",
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        manualChunks: {
          vendor: ["@builder.io/qwik", "@builder.io/qwik-city"],
        },
      },
    },
  },
  optimizeDeps: {
    exclude: [],
  },
});
