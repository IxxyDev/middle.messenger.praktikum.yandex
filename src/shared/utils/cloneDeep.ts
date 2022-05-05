export const cloneDeep = (obj: Record<string, unknown>): Record<string, unknown> => {
  return Object.assign({}, obj)
}
