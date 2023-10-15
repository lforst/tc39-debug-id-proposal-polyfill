import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import modulePackage from "module";
import fs from "fs";

const packageJson = JSON.parse(
  fs.readFileSync(new URL("package.json", import.meta.url), "utf-8")
);

const input = ["src/index.ts"];

const extensions = [".ts", ".js", ".mjs"];

export default {
  input,
  external: [
    ...modulePackage.builtinModules,
    "magic-string",
    "proposal-debug-id-utils",
  ],
  onwarn: (warning) => {
    throw new Error(warning.message); // Warnings are usually high-consequence for us so let's throw to catch them
  },
  plugins: [
    resolve({
      extensions,
      rootDir: "./src",
      preferBuiltins: true,
    }),
    babel({
      extensions,
      babelHelpers: "bundled",
      include: ["src/**/*"],
    }),
  ],
  output: [
    {
      file: packageJson.module,
      format: "esm",
      exports: "named",
      sourcemap: true,
    },
    {
      file: packageJson.main,
      format: "cjs",
      exports: "named",
      sourcemap: true,
    },
  ],
};
