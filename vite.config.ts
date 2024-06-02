import { ViteMinifyPlugin } from "vite-plugin-minify";
import { defineConfig } from "vite";
import postcssNested from "postcss-nested";
import { qwikCity } from "@builder.io/qwik-city/vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(() => {
  return {
    plugins: [
      qwikCity(),
      qwikVite(),
      tsconfigPaths(),
      ViteMinifyPlugin(),
      postcssNested(),
    ],
    server: {
      headers: {
        // Don't cache the server response in dev mode
        "Cache-Control": "public, max-age=0",
      },
    },
    preview: {
      headers: {
        // Do cache the server response in preview (non-adapter production build)
        "Cache-Control": "public, max-age=600",
      },
    },
    build: {
      emptyOutDir: true,
      reportCompressedSize: true,
      cssCodeSplit: true,
      chunkSizeWarningLimit: 1600,
    },
  };
});
