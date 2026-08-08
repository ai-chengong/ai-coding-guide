import assert from "node:assert/strict";
import test from "node:test";

import { buildUpstreamUrl, rewriteLocation } from "../infra/domain-edge/worker.mjs";

test("domain edge fixes the Sites origin while preserving path and query", () => {
  assert.equal(
    buildUpstreamUrl("https://untrusted.example/codex/01-what-is-codex?from=test").toString(),
    "https://coding-aichengong.freya-czy.chatgpt.site/codex/01-what-is-codex?from=test",
  );
});

test("domain edge rewrites only redirects back to the public hostname", () => {
  const upstream = new URL("https://coding-aichengong.freya-czy.chatgpt.site/codex");

  assert.equal(
    rewriteLocation("/codex/01-what-is-codex?from=redirect#start", upstream),
    "https://coding.aichengong.com/codex/01-what-is-codex?from=redirect#start",
  );
  assert.equal(rewriteLocation("https://openai.com/", upstream), "https://openai.com/");
  assert.equal(rewriteLocation(null, upstream), null);
});
