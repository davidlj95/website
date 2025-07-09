import { TestBed } from '@angular/core/testing'
import { DOCUMENT } from '@angular/core'

const NO_MOTION_ATTRIBUTE = 'data-reduced-motion'

export const forceReducedMotion = () => {
  let html: HTMLElement | undefined

  beforeEach(() => {
    html = TestBed.inject(DOCUMENT).documentElement
    html.setAttribute(NO_MOTION_ATTRIBUTE, '')
  })
  afterEach(() => {
    html?.removeAttribute(NO_MOTION_ATTRIBUTE)
  })
}
