export function formatMockTranslation(text: string): string {
  return text.length > 0 ? `[Translated] ${text}` : "";
}