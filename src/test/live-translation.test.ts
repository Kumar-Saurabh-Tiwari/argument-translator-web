import { describe, expect, it } from "vitest";

import { formatMockTranslation } from "@/lib/live-translation";

describe("mock translation preview", () => {
  it("shows the speaker's text without a fake translation prefix", () => {
    expect(formatMockTranslation("We need to talk.")).toBe("We need to talk.");
  });

  it("leaves the incoming area empty until someone types", () => {
    expect(formatMockTranslation("")).toBe("");
  });
});