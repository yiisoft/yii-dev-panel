export const parseFilePath = (path: string) => {
    return path.replace(/(:[0-9a-z_]+)$/i, '');
};
