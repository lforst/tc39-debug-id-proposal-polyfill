# rollup-plugin-proposal-debug-id

Polyfill Rollup Plugin for the [TC39 Source Map Debug ID Proposal](https://github.com/tc39/source-map-rfc/blob/main/proposals/debug-id.md).

## Usage

```ts
// rollup.config.mjs
import { defineConfig } from "rollup";
import { debugIdProposalPlugin } from "rollup-plugin-proposal-debug-id";

export default defineConfig({
  // other options ...
  plugins: [debugIdProposalPlugin()], // put plugin as late as possible
});
```

## Effects

- Exposes global function property `getDebugIdSnippet(url)` that allows to extract a Debug Id for a paticular url.
- Inserts a `debugId` field into generated source maps.

## Attribution

Based on implmentation over at [Sentry JavaScript Bundler Plugins](https://github.com/getsentry/sentry-javascript-bundler-plugins).
