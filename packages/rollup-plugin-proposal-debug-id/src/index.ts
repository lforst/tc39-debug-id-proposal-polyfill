import {
  getDebugIdSnippet,
  stringToUUID,
  COMMENT_USE_STRICT_REGEX,
} from "proposal-debug-id-utils";
import MagicString from "magic-string";

import type { Plugin } from "rollup";

export function debugIdProposalPlugin(): Plugin {
  return {
    name: "debug-id-proposal-plugin",
    renderChunk(code, chunk) {
      if (
        [".js", ".mjs", ".cjs"].some((ending) =>
          chunk.fileName.endsWith(ending)
        ) // chunks could be any file (html, md, ...)
      ) {
        const debugId = stringToUUID(code); // generate a deterministic debug ID
        const codeToInject = getDebugIdSnippet(debugId);

        const ms = new MagicString(code, { filename: chunk.fileName });

        const match = code.match(COMMENT_USE_STRICT_REGEX)?.[0];

        if (match) {
          // Add injected code after any comments or "use strict" at the beginning of the bundle.
          ms.appendLeft(match.length, codeToInject);
        } else {
          // ms.replace() doesn't work when there is an empty string match (which happens if
          // there is neither, a comment, nor a "use strict" at the top of the chunk) so we
          // need this special case here.
          ms.prepend(codeToInject);
        }

        // @ts-ignore
        chunk.debugId = debugId;

        return {
          code: ms.toString(),
          map: ms.generateMap({ file: chunk.fileName, hires: true }),
        };
      } else {
        return null;
      }
    },
    generateBundle(options, bundle, isWrite) {
      const sourceMapFileNameDebugIdMap = new Map<string, string>();
      Object.values(bundle).forEach((artifact) => {
        if (artifact.type === "chunk") {
          // @ts-ignore
          if (artifact.sourcemapFileName && artifact.debugId) {
            sourceMapFileNameDebugIdMap.set(
              artifact.sourcemapFileName,
              // @ts-ignore
              artifact.debugId
            );
          }
        }
      });
      Object.entries(bundle).forEach(([filename, artifact]) => {
        if (artifact.type === "asset" && artifact.fileName.endsWith(".map")) {
          try {
            const sauceMap = JSON.parse(artifact.source.toString());
            sauceMap.debugId = sourceMapFileNameDebugIdMap.get(filename);
            artifact.source = JSON.stringify(sauceMap);
          } catch {
            // noop
          }
        }
      });
    },
  };
}
