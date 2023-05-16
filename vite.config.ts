import { ViteMinifyPlugin } from "vite-plugin-minify";
import { cloudflarePagesAdapter } from "@builder.io/qwik-city/adapters/cloudflare-pages/vite";
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
      cloudflarePagesAdapter({
        ssg: {
          include: ["/*"],
          origin: "https://qwik.builder.io",
          sitemapOutFile: "sitemap.xml",
        },
      }),
    ],
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
      minify: "terser",
      ssr: true,
      rollupOptions: {
        input: ["src/entry.ssr.tsx", "@qwik-city-plan"],
      },
    },
  };
});
