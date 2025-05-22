export const urlOrUndefined = (url: string | undefined): URL | undefined =>
  url ? new URL(url) : undefined
