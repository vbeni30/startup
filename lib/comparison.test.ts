import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { clampCompare, readComparisonQuery, withComparison } from "./comparison";

describe("clampCompare", () => {
  it("rounds and clamps to the slider range", () => {
    assert.equal(clampCompare(50.6), 51);
    assert.equal(clampCompare(-5), 0);
    assert.equal(clampCompare(140), 100);
    assert.equal(clampCompare("50"), 50);
    assert.equal(clampCompare(0), 0);
    assert.equal(clampCompare("nope"), 0);
    assert.equal(clampCompare(""), 0);
  });
});

describe("readComparisonQuery", () => {
  it("defaults to the original desktop split view", () => {
    assert.deepEqual(readComparisonQuery({}), { device: "desktop", compare: 50 });
  });

  it("reads mobile and an explicit compare value", () => {
    assert.deepEqual(readComparisonQuery({ device: "mobile", compare: "0" }), { device: "mobile", compare: 0 });
    assert.deepEqual(readComparisonQuery({ device: ["mobile"], compare: ["80.2"] }), { device: "mobile", compare: 80 });
  });
});

describe("withComparison", () => {
  it("omits the default desktop split from the address", () => {
    assert.equal(withComparison("https://example.com/#work", "desktop", 50), "/#work");
  });

  it("keeps the hash and unrelated query while recording a custom view", () => {
    assert.equal(
      withComparison("https://example.com/?utm=studio#step-02", "mobile", 100),
      "/?utm=studio&device=mobile&compare=100#step-02",
    );
  });

  it("drops comparison params when the view returns to the default", () => {
    assert.equal(withComparison("https://example.com/?device=mobile&compare=12", "desktop", 50), "/");
  });
});
