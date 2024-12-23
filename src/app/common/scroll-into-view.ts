export const scrollIntoView = (
  element: Element,
  ...args: Parameters<Element['scrollIntoView']>
) => {
  // 👇 For the server
  if (element.scrollIntoView) {
    element.scrollIntoView(...args)
  }
}
