import { ViteMinifyPlugin } from "vite-plugin-minify";
import { defineConfig } from "vite";
import { qwikCity } from "@builder.io/qwik-city/vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(() => {
  return {
    plugins: [qwikCity(), qwikVite(), tsconfigPaths(), ViteMinifyPlugin()],
    preview: {
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    },
    build: {
      emptyOutDir: true,
      reportCompressedSize: true,
      cssCodeSplit: true,
      chunkSizeWarningLimit: 1600,
      minify: true,
    },
  };
});
