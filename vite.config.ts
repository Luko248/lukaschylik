/**
 * Base Vite configuration for Qwik application with SSR support
 */

import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import { defineConfig, type UserConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import pkg from "./package.json";

interface PackageJson {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  [key: string]: unknown;
}

const { dependencies = {}, devDependencies = {} } = pkg as PackageJson;
errorOnDuplicatesPkgDeps(devDependencies, dependencies);

export default defineConfig((): UserConfig => {
  return {
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
    ],
    optimizeDeps: {
      exclude: [],
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
  };
});

/**
 * Validates that dependencies are not duplicated between devDependencies and dependencies
 * @param devDependencies - Development dependencies
 * @param dependencies - Production dependencies
 */
function errorOnDuplicatesPkgDeps(
  devDependencies: Record<string, string>,
  dependencies: Record<string, string>,
) {
  let msg = "";
  
  const duplicateDeps = Object.keys(devDependencies).filter(
    (dep) => dependencies[dep],
  );

  const qwikPkg = Object.keys(dependencies).filter((value) =>
    /qwik/i.test(value),
  );

  msg = `Move qwik packages ${qwikPkg.join(", ")} to devDependencies`;

  if (qwikPkg.length > 0) {
    throw new Error(msg);
  }

  msg = `
    Warning: The dependency "${duplicateDeps.join(", ")}" is listed in both "devDependencies" and "dependencies".
    Please move the duplicated dependencies to "devDependencies" only and remove it from "dependencies"
  `;

  if (duplicateDeps.length > 0) {
    throw new Error(msg);
  }
}
