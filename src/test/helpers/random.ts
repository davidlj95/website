/**
 * https://stackoverflow.com/a/5915122/3263250
 */
export function getSampleFromArray<T>(array: Array<T>): T {
  return array[Math.floor(Math.random() * array.length)]
}
