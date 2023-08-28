import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { AppModule } from '../app/app.module';
import { ColorSchemeService, Scheme } from '../app/toolbar/color-scheme.service';

describe('App color scheme', () => {
  let bodyElement: HTMLElement;
  let colorSchemeService: ColorSchemeService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    });

    const document = TestBed.inject(DOCUMENT);
    colorSchemeService = TestBed.inject(ColorSchemeService);
    bodyElement = document.body;
  });

  describe('when light color scheme is set', () => {
    beforeEach(() => {
      colorSchemeService.setManual(Scheme.Light);
    })
    it('body should have a light background color (high luminance)', () => {
      const bodyBackgroundColor = getRgbFromCssRgbColor(getComputedStyle(bodyElement).backgroundColor);
      const bodyBackgroundColorLuminance = getRelativeLuminance(bodyBackgroundColor);
      expect(bodyBackgroundColorLuminance).toBeGreaterThan(.75);
    })
  })
  describe('when dark color scheme is set', () => {
    beforeEach(() => {
      colorSchemeService.setManual(Scheme.Dark);
    })
    it('body should have a dark background color (low luminance)', () => {
      const bodyBackgroundColor = getRgbFromCssRgbColor(getComputedStyle(bodyElement).backgroundColor);
      const bodyBackgroundColorLuminance = getRelativeLuminance(bodyBackgroundColor);
      expect(bodyBackgroundColorLuminance).toBeLessThan(.25);
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
