import { defineConfig } from 'vite'
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import postcssPresetEnv from 'postcss-preset-env';

export default defineConfig({
  plugins: [
    qwikCity(),
    qwikVite(),
    tsconfigPaths(),
  ],
  css: {
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer,
        postcssPresetEnv({ 
          stage: 1,
          features: {
            "cascade-layers": true
          }
        }),
      ],
    },
  },
  server: {
    headers: {
      "Cache-Control": "public, max-age=0",
    },
  },
  preview: {
    headers: {
      "Cache-Control": "public, max-age=600",
    },
  },
})