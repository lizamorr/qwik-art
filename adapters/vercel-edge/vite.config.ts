import baseConfig from "../../vite.config";
import { extendConfig } from "@builder.io/qwik-city/vite";
import { vercelEdgeAdapter } from "@builder.io/qwik-city/adapters/vercel-edge/vite";

export default extendConfig(baseConfig, () => {
  return {
    build: {
      ssr: true,
      rollupOptions: {
        input: ["src/entry.vercel-edge.tsx", "@qwik-city-plan"],
      },
      outDir: ".vercel/output/functions/_qwik-city.func",
    },
    plugins: [vercelEdgeAdapter()],
    ssg: null,
  };
});
