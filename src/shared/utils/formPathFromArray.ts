export const formPathFromArray = (arr: string[]): string => arr.reduce((acc: string, path: string) => `${acc}.${path}`);
