// TODO: those could be custom matchers
export function expectIsVisible(element: Element) {
  expectVisibility(element, true)
}
export function expectIsHidden(element: Element) {
  expectVisibility(element, false)
}

export function expectIsNotDisplayed(element: Element) {
  expectCanBeDisplayed(element, false)
}

export function expectIsDisplayed(element: Element) {
  expectCanBeDisplayed(element, true)
}

function expectCanBeDisplayed(element: Element, displayed: boolean) {
  const styles = getComputedStyle(element)
  expect(styles.display === DISPLAY_NONE)
    .withContext(`is ${displayed ? '' : 'not '}displayed`)
    .toBe(!displayed)
}

const DISPLAY_NONE = 'none'

export function expectHiddenVisibility(element: Element) {
  const styles = getComputedStyle(element)
  expect(styles.visibility === VISIBILITY_HIDDEN)
    .withContext(`has hidden visibility`)
    .toBeTrue()
}

const VISIBILITY_HIDDEN = 'hidden'

function expectVisibility(element: Element, visible: boolean) {
  const styles = getComputedStyle(element)
  const isHiddenWithVisibility = styles.visibility === VISIBILITY_HIDDEN
  const isHiddenWithDisplay = styles.display === DISPLAY_NONE
  expect(isHiddenWithDisplay || isHiddenWithVisibility)
    .withContext(`is ${visible ? '' : 'not '}visible`)
    .toBe(!visible)
}

export function expectIsInLayout(element: Element) {
  const { height, width, x, y } = element.getBoundingClientRect()
  expect({ height, width, x, y })
    .withContext('is in layout')
    .not.toEqual(NOT_RENDERED_BOUNDING_BOX)
}

export function expectIsNotInLayout(element: Element) {
  const { height, width, x, y } = element.getBoundingClientRect()
  expect({ height, width, x, y })
    .withContext('is not in layout')
    .toEqual(NOT_RENDERED_BOUNDING_BOX)
}

const NOT_RENDERED_BOUNDING_BOX = {
  height: 0,
  width: 0,
  x: 0,
  y: 0,
} satisfies Partial<DOMRect>
