// TODO: those could be custom matchers
export function expectIsVisible(element: Element) {
  expectVisibility(element, true)
}
export function expectIsHidden(element: Element) {
  expectVisibility(element, false)
}

function expectVisibility(element: Element, visible: boolean) {
  const styles = getComputedStyle(element)
  const isHiddenWithVisibility = styles.visibility === 'hidden'
  const isHiddenWithDisplay = styles.display === 'none'
  expect(isHiddenWithDisplay || isHiddenWithVisibility)
    .withContext(`is ${visible ? '' : 'not '}visible`)
    .toBe(!visible)
}
