import { defineConfig } from "vite";
import { debugIdProposalPlugin } from "vite-plugin-proposal-debug-id";

export default defineConfig({
  build: {
    outDir: "./output/vite",
    lib: {
      entry: "./input/index.js",
      name: "ExampleBundle",
      fileName: "index",
      formats: ["cjs"],
    },
    sourcemap: true,
  },
  plugins: [debugIdProposalPlugin()],
});
