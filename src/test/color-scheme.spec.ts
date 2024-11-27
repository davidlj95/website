import {
  ColorSchemeService,
  Scheme,
} from '../app/header/light-dark-toggle/color-scheme.service'
import { serviceTestSetup } from '@/test/helpers/service-test-setup'
import { forceReducedMotion } from '@/test/helpers/motion'
import { forceColorScheme } from '@/test/helpers/color-scheme'

describe('App color scheme', () => {
  let bodyElement: HTMLElement
  const LIGHT_MIN_LUMINANCE = 0.75
  const DARK_MAX_LUMINANCE = 0.25

  beforeEach(async () => {
    serviceTestSetup(ColorSchemeService)
    bodyElement = document.body
  })
  forceReducedMotion()

  describe('when light color scheme is set', () => {
    forceColorScheme(Scheme.Light)

    it('body should have a light background color (high luminance), whilst text color should be a dark one (low luminance)', async () => {
      const bodyBackgroundColor = getRgbFromCssRgbColor(
        getComputedStyle(bodyElement).backgroundColor,
      )
      const bodyBackgroundColorLuminance =
        getRelativeLuminance(bodyBackgroundColor)

      expect(bodyBackgroundColorLuminance).toBeGreaterThan(LIGHT_MIN_LUMINANCE)
      const bodyTextColor = getRgbFromCssRgbColor(
        getComputedStyle(bodyElement).color,
      )
      const bodyTextColorLuminance = getRelativeLuminance(bodyTextColor)

      expect(bodyTextColorLuminance).toBeLessThan(DARK_MAX_LUMINANCE)
    })
  })

  describe('when dark color scheme is set', () => {
    forceColorScheme(Scheme.Dark)

    it('body should have a dark background color (low luminance), whilst text color should be a light one (high luminance)', async () => {
      const bodyBackgroundColor = getRgbFromCssRgbColor(
        getComputedStyle(bodyElement).backgroundColor,
      )
      const bodyBackgroundColorLuminance =
        getRelativeLuminance(bodyBackgroundColor)

      expect(bodyBackgroundColorLuminance).toBeLessThan(DARK_MAX_LUMINANCE)

      const bodyTextColor = getRgbFromCssRgbColor(
        getComputedStyle(bodyElement).color,
      )
      const bodyTextColorLuminance = getRelativeLuminance(bodyTextColor)

      expect(bodyTextColorLuminance).toBeGreaterThan(LIGHT_MIN_LUMINANCE)
    })
  })

  type RgbaArray = [r: number, g: number, b: number, a?: number]
  // https://en.wikipedia.org/wiki/Relative_luminance
  // https://stackoverflow.com/a/52879332/3263250
  // It doesn't take into account alpha channel
  const getRelativeLuminance = (rgb: RgbaArray) =>
    (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) / 255
  // https://stackoverflow.com/a/3752026/3263250
  const getRgbFromCssRgbColor = (cssRgbColor: string): RgbaArray =>
    cssRgbColor
      .replace(/^(rgb|rgba)\(/, '')
      .replace(/\)$/, '')
      .replace(/\s/g, '')
      .split(',')
      .map((v) => parseFloat(v)) as RgbaArray
})
