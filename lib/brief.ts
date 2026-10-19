export function buildBrief(input: { name: string; email: string; website: string; goal: string }): string {
  return [
    "WEBSITE REVIEW ENQUIRY",
    "Second Form",
    "",
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Current website: ${input.website}`,
    `Main goal: ${input.goal}`,
    "",
    "I\u2019d like a fresh perspective on my website and to explore a redesign.",
    "",
    "Prepared locally. This enquiry has not been sent.",
  ].join("\n");
}

export function enquiryFilename(website: string): string {
  let host = "website";
  try {
    host = new URL(website).hostname.replace(/^www\./i, "");
  } catch {
    host = "website";
  }
  const slug = host.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "website";
  return `second-form-website-enquiry-${slug}.txt`;
}
