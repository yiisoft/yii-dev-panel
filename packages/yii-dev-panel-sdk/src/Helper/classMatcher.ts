export const isClassString = (value: string): boolean => {
    return value.match(/^[a-z](?:[a-z0-9_]+?\\[a-z0-9_]+)+$/i)?.length === 1;
};
