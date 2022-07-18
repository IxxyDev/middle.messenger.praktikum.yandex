export const formEventName = (...names: string[]): string => names.reduce((name1, name2) => `${name1} ${name2}`);
