export const parseFilePath = (path: string): string => {
    return path.replace(/(:[0-9a-z_]+)$/i, '');
};
export const parseFilePathWithLineAnchor = (path: string): string => {
    const filePath = parseFilePath(path);
    const lineNumberMatches = path.match(/:([0-9]+)$/i);
    if (lineNumberMatches && lineNumberMatches.length) {
        return filePath + '#L' + lineNumberMatches.pop();
    }
    return filePath;
};

export const parsePathLineAnchor = (path: string): [number] | [number, number] | undefined => {
    const lineNumberMatches = path.match(/L([0-9]+)(?:-([0-9]+))?$/);
    if (lineNumberMatches && lineNumberMatches.length) {
        // @ts-ignore
        return lineNumberMatches.slice(1).slice(0, 2).filter(Boolean).map(Number);
    }
    return undefined;
};
