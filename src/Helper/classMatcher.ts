export const isClassString = (value: string): boolean => {
  return value.match(/^[a-z0-9\\_]+[a-z]$/i)?.length === 1;
}