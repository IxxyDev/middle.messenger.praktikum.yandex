export const formPathFromArray = (arr: string[]): string => {
  return arr.reduce((acc: string, path: string) => `${acc}.${path}`)
}
