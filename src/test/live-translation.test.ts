import { describe, expect, it } from "vitest";

import { formatMockTranslation } from "@/lib/live-translation";

describe("mock translation preview", () => {
  it("preserves the speaker's text and marks it as simulated", () => {
    expect(formatMockTranslation("We need to talk.")).toBe("[Translated] We need to talk.");
  });

  it("leaves the incoming area empty until someone types", () => {
    expect(formatMockTranslation("")).toBe("");
  });
});