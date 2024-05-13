// TODO: those could be custom matchers
export function expectIsInLayout(element: Element) {
  expect(element.checkVisibility()).withContext('is in layout').toBeTrue()
}

export function expectIsNotInLayout(element: Element) {
  expect(element.checkVisibility()).withContext('is not in layout').toBeFalse()
}

export function expectIsNotVisible(element: Element) {
  expect(
    element.checkVisibility({ checkVisibilityCSS: true, checkOpacity: true }),
  )
    .withContext('is not visible')
    .toBeFalse()
}
