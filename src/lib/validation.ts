export function validateSighting(
  species: string,
  count: number,
): string | null {
  if (!species.trim()) {
    return "Please select a bird species.";
  }

  if (!Number.isInteger(count) || count < 1) {
    return "Count must be a whole number greater than 0.";
  }

  return null;
}
