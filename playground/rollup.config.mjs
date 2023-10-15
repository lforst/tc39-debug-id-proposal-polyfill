import { defineConfig } from "rollup";
import { debugIdProposalPlugin } from "rollup-plugin-proposal-debug-id";

export default defineConfig({
  input: "./input/index.js",
  plugins: [debugIdProposalPlugin()],
  output: {
    dir: "./output/rollup",
    format: "cjs",
    exports: "named",
    sourcemap: true,
  },
});
