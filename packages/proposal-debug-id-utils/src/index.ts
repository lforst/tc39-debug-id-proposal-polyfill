import { v5 as uuidv5 } from "uuid";

export const COMMENT_USE_STRICT_REGEX =
  /^(?:\s*|\/\*(?:.|\r|\n)*?\*\/|\/\/.*[\n\r])*(?:"[^"]*";|'[^']*';)?/;

export function getDebugIdSnippet(debugId: string) {
  return `(function () {
  var stack = new Error().stack;
  var match = stack && stack.match(/(?:\\bat |@)(.*?):\\d+:\\d+$/m);
  var ids = (globalThis.__DEBUG_IDS__ = globalThis.__DEBUG_IDS__ || {});
  globalThis.getDebugIdForUrl = function (url) {
    return ids[url];
  };
  if (match) {
    ids[match[1]] = "${debugId}";
  }
})();`;
}

const V5_NAMESPACE = "4ada053d-8dfe-4cb0-822f-4fea3328740b";

export function stringToUUID(input: string): string {
  return uuidv5(input, V5_NAMESPACE);
}
