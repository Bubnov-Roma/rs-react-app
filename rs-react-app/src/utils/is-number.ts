export function isNumber(value: unknown, defaultValue = 1): number {
  if (typeof value === 'number' && !Number.isNaN(value)) return value;
  if (
    typeof value === 'string' &&
    value.trim() !== '' &&
    !Number.isNaN(Number(value))
  ) {
    return Number(value);
  }
  return defaultValue;
}
