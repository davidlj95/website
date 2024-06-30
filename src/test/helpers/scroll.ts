import { TestBed } from '@angular/core/testing'
import { DOCUMENT } from '@angular/common'

type ExpectInViewportOpts = Omit<
  ElementIntersectsOptions,
  'expectedIntersecting'
> & {
  readonly context?: string
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

interface ElementIntersectsOptions {
  readonly viewport?: HTMLElement
  readonly waitForChange?: boolean
  readonly expectedIntersecting: boolean
}

async function elementIntersects(
  element: HTMLElement,
  opts: ElementIntersectsOptions,
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
