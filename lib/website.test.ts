import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { normalizeWebsite } from "./website";

describe("normalizeWebsite", () => {
  it("adds https and a trailing slash for a bare domain", () => {
    assert.equal(normalizeWebsite("yourbusiness.com"), "https://yourbusiness.com/");
  });

  it("keeps a path, query, and explicit http scheme", () => {
    assert.equal(normalizeWebsite("https://yourbusiness.com/path?ref=1"), "https://yourbusiness.com/path?ref=1");
    assert.equal(normalizeWebsite("http://example.co.uk"), "http://example.co.uk/");
  });

  it("accepts subdomains and ports", () => {
    assert.equal(normalizeWebsite("studio.example.com/work"), "https://studio.example.com/work");
    assert.equal(normalizeWebsite("https://example.com:8080/path"), "https://example.com:8080/path");
  });

  it("rejects empty values, spaces, credentials, and non-http schemes", () => {
    assert.equal(normalizeWebsite("   "), null);
    assert.equal(normalizeWebsite("not a url"), null);
    assert.equal(normalizeWebsite("javascript:alert(1)"), null);
    assert.equal(normalizeWebsite("https://user:pass@example.com"), null);
    assert.equal(normalizeWebsite("localhost"), null);
    assert.equal(normalizeWebsite("https://example"), null);
  });
});
