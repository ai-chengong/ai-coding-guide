import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const configUrl = new URL("../infra/domain-edge/wrangler.jsonc", import.meta.url);

async function readConfig() {
  return JSON.parse(await readFile(configUrl, "utf8"));
}

test("production runtime serves the built vinext worker and assets directly", async () => {
  const config = await readConfig();

  assert.equal(config.main, "../../dist/server/index.js");
  assert.equal(config.assets.directory, "../../dist/client");
  assert.equal(config.no_bundle, true);
  assert.ok(config.compatibility_flags.includes("nodejs_compat"));
});

test("production runtime owns the canonical hostname as a custom domain", async () => {
  const config = await readConfig();

  assert.deepEqual(config.routes, [
    {
      pattern: "coding.aichengong.com",
      custom_domain: true,
    },
  ]);
});
