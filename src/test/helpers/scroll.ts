import { TestBed } from '@angular/core/testing'
import { DOCUMENT } from '@angular/common'

interface ExpectInViewportOpts {
  readonly viewport?: HTMLElement
  readonly context?: string
  readonly waitForChange?: boolean
}
export async function expectIsInViewport(
  element: HTMLElement,
  opts: ExpectInViewportOpts = {},
) {
  expect(
    await elementIntersects(element, { ...opts, expectedIntersecting: true }),
  )
    .withContext(`${opts.context ? opts.context + ' ' : ''}is in viewport`)
    .toBeTrue()
}
export async function expectIsNotInViewport(
  element: HTMLElement,
  opts: ExpectInViewportOpts = {},
) {
  expect(
    await elementIntersects(element, { ...opts, expectedIntersecting: false }),
  )
    .withContext(`${opts.context ? opts.context + ' ' : ''}is not in viewport`)
    .toBeFalse()
}
async function elementIntersects(
  element: HTMLElement,
  opts: ExpectInViewportOpts & { expectedIntersecting: boolean },
) {
  return new Promise<boolean>((resolve) => {
    new IntersectionObserver(
      (entries, observer) => {
        if (entries.length !== 1) {
          throw new Error(
            `Unexpected amount of entries in interaction observer callback (${entries.length})`,
          )
        }
        const isIntersecting = entries[0].isIntersecting
        if (
          opts.waitForChange &&
          isIntersecting !== opts.expectedIntersecting
        ) {
          return
        }
        observer.unobserve(element)
        resolve(isIntersecting)
      },
      {
        root: opts.viewport ?? TestBed.inject(DOCUMENT).documentElement,
        //👇 Mystery, but doesn't get to 1 when testing
        threshold: 0.99,
      },
    ).observe(element)
  })
}
