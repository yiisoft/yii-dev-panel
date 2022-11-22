export const objectIdParser = (string: string) => {
    return Number(string.substring(string.indexOf('#', -1) + 1));
};
