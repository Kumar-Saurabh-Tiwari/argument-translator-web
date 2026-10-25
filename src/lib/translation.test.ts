import { describe, expect, it } from "vitest";

import { parseGroqTranslationResponse, resolveGroqModel } from "@/lib/translation";

describe("Groq translation response", () => {
  it("returns the trimmed translated text", () => {
    expect(
      parseGroqTranslationResponse({
        choices: [{ message: { content: "  Hola, ¿cómo estás?  " } }],
      }),
    ).toBe("Hola, ¿cómo estás?");
  });

  it("rejects an empty translation", () => {
    expect(() =>
      parseGroqTranslationResponse({
        choices: [{ message: { content: "  " } }],
      }),
    ).toThrow("The translation provider returned an empty translation.");
  });
});

describe("Groq model configuration", () => {
  it("uses the current fallback when no model is configured", () => {
    expect(resolveGroqModel(undefined)).toBe("openai/gpt-oss-120b");
  });

  it("replaces the retired default model", () => {
    expect(resolveGroqModel("llama-3.3-70b-versatile")).toBe("openai/gpt-oss-120b");
  });

  it("preserves other configured models", () => {
    expect(resolveGroqModel("custom-model")).toBe("custom-model");
  });
});
