import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { AppModule } from '../app/app.module';
import { ColorSchemeService, Scheme } from '../app/toolbar/color-scheme.service';
import { sleep } from './helpers/sleep';

describe('App color scheme', () => {
  let bodyElement: HTMLElement;
  let colorSchemeService: ColorSchemeService;
  const LIGHT_MIN_LUMINANCE = 0.75;
  const DARK_MAX_LUMINANCE = 0.25;
  // TODO: if we respect no motion, we can go back to instant tests
  const ANIMATION_MILLIS = 700;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    });

    const document = TestBed.inject(DOCUMENT);
    colorSchemeService = TestBed.inject(ColorSchemeService);
    bodyElement = document.body;
  });

  describe('when light color scheme is set', () => {
    it('body should have a light background color (high luminance), whilst text color should be a dark one (low luminance)', async () => {
      colorSchemeService.setManual(Scheme.Light);
      await sleep(ANIMATION_MILLIS);

      const bodyBackgroundColor = getRgbFromCssRgbColor(getComputedStyle(bodyElement).backgroundColor);
      const bodyBackgroundColorLuminance = getRelativeLuminance(bodyBackgroundColor);
      expect(bodyBackgroundColorLuminance).toBeGreaterThan(LIGHT_MIN_LUMINANCE);
      const bodyTextColor = getRgbFromCssRgbColor(getComputedStyle(bodyElement).color);
      const bodyTextColorLuminance = getRelativeLuminance(bodyTextColor);
      expect(bodyTextColorLuminance).toBeLessThan(DARK_MAX_LUMINANCE);
    })
  })
  describe('when dark color scheme is set', () => {
    it('body should have a dark background color (low luminance), whilst text color should be a light one (high luminance)', async () => {
      colorSchemeService.setManual(Scheme.Dark);
      await sleep(ANIMATION_MILLIS);

      const bodyBackgroundColor = getRgbFromCssRgbColor(getComputedStyle(bodyElement).backgroundColor);
      const bodyBackgroundColorLuminance = getRelativeLuminance(bodyBackgroundColor);
      expect(bodyBackgroundColorLuminance).toBeLessThan(DARK_MAX_LUMINANCE);

      const bodyTextColor = getRgbFromCssRgbColor(getComputedStyle(bodyElement).color);
      const bodyTextColorLuminance = getRelativeLuminance(bodyTextColor);
      expect(bodyTextColorLuminance).toBeGreaterThan(LIGHT_MIN_LUMINANCE);
    })
  })

  type rgbaArray = [r: number, g: number, b: number, a?: number];
  // https://en.wikipedia.org/wiki/Relative_luminance
  // https://stackoverflow.com/a/52879332/3263250
  // It doesn't take into account alpha channel
  const getRelativeLuminance = (rgb: rgbaArray) =>
    (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) / 255;
  // https://stackoverflow.com/a/3752026/3263250
  const getRgbFromCssRgbColor = (cssRgbColor: string): rgbaArray => cssRgbColor
    .replace(/^(rgb|rgba)\(/, '')
    .replace(/\)$/, '')
    .replace(/\s/g, '')
    .split(',')
    .map((v) => parseFloat(v)) as rgbaArray
});
