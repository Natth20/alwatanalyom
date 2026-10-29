import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { SearchClient } from "../client";

describe("Search Client & Query Logic", () => {
  it("initializes with default or custom host without trailing slash", () => {
    const client = new SearchClient("http://localhost:7700/", "test-key");
    assert.strictEqual((client as any).host, "http://localhost:7700");
    assert.strictEqual((client as any).apiKey, "test-key");
  });

  it("returns empty result for blank or whitespace query", async () => {
    const client = new SearchClient();
    const result = await client.search("   ");
    assert.ok(result);
    assert.strictEqual(result.hits.length, 0);
    assert.strictEqual(result.total, 0);
  });

  it("handles offline Meilisearch host gracefully by returning null fallback", async () => {
    const unreachableClient = new SearchClient("http://127.0.0.1:59999", "dummy-key");
    const isAvail = await unreachableClient.isAvailable();
    assert.strictEqual(isAvail, false);

    const searchRes = await unreachableClient.search("فلسطين");
    assert.strictEqual(searchRes, null); // signals to fall back to Prisma database
  });
});
