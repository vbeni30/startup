import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { buildBrief, enquiryFilename } from "./brief";

describe("buildBrief", () => {
  it("matches the local enquiry wording", () => {
    assert.equal(
      buildBrief({
        name: "Alex Morgan",
        email: "alex@yourbusiness.com",
        website: "https://yourbusiness.com/",
        goal: "Make our offer clearer",
      }),
      [
        "WEBSITE REVIEW ENQUIRY",
        "Second Form",
        "",
        "Name: Alex Morgan",
        "Email: alex@yourbusiness.com",
        "Current website: https://yourbusiness.com/",
        "Main goal: Make our offer clearer",
        "",
        "I\u2019d like a fresh perspective on my website and to explore a redesign.",
        "",
        "Prepared locally. This enquiry has not been sent.",
      ].join("\n"),
    );
  });
});

describe("enquiryFilename", () => {
  it("uses the hostname so downloads do not overwrite each other", () => {
    assert.equal(enquiryFilename("https://www.yourbusiness.com/"), "second-form-website-enquiry-yourbusiness-com.txt");
    assert.equal(enquiryFilename("not a url"), "second-form-website-enquiry-website.txt");
  });
});
