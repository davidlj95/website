import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { MockProvider } from 'ng-mocks';
import { WINDOW } from '../common/window-injection-token';
import { ColorSchemeService, Schemes } from './color-scheme.service';

describe('ColorSchemeService', () => {
  let sut: ColorSchemeService;
  let documentElement: HTMLElement;
  let mockMatchMedia: typeof Window.prototype.matchMedia =
    (query) => {
      // Most future-friendly way is to ask whether user prefers dark or not
      // As other preferences (like sepia) may be introduced in the future.
      // https://www.w3.org/TR/mediaqueries-5/#prefers-color-scheme
      if (query === '(prefers-color-scheme: dark)') {
        return {matches: prefersDark} as MediaQueryList
      }
      throw new Error('Media query not mocked')
    }
  let prefersDark = false;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockProvider(WINDOW, {matchMedia: mockMatchMedia} as Pick<Window, 'matchMedia'>),
      ]
    });

    sut = TestBed.inject(ColorSchemeService);
    documentElement = TestBed.inject(DOCUMENT).documentElement;
  });

  it('should be created', () => {
    expect(sut).toBeTruthy();
  });

  describe('#toggleDarkLight', () => {
    afterEach(() => {
      documentElement.removeAttribute(ColorSchemeService.HTML_ATTRIBUTE);
    })
    describe('when user does not prefer dark color scheme', () => {
      beforeEach(() => {
        prefersDark = false;
      });
      describe('when no color scheme is manually set', () => {
        it('should manually set the scheme to dark', () => {
          sut.toggleDarkLight();

          const schemeAttributeValue = documentElement.getAttribute(ColorSchemeService.HTML_ATTRIBUTE);
          expect(schemeAttributeValue).toBe(Schemes.Dark)
        });
      });
      describe('when color scheme is manually set', () => {
        describe('when set to light', () => {
          beforeEach(() => {
            documentElement.setAttribute(ColorSchemeService.HTML_ATTRIBUTE, Schemes.Light);
          })
          it('should manually set the scheme to dark', () => {
            sut.toggleDarkLight();

            const schemeAttributeValue = documentElement.getAttribute(ColorSchemeService.HTML_ATTRIBUTE);
            expect(schemeAttributeValue).toBe(Schemes.Dark)
          });
        });
        describe('when set to dark', () => {
          beforeEach(() => {
            documentElement.setAttribute(ColorSchemeService.HTML_ATTRIBUTE, Schemes.Dark);
          })
          it('should remove the manual scheme preference to go back to light', () => {
            sut.toggleDarkLight();

            const schemeAttributeValue = documentElement.getAttribute(ColorSchemeService.HTML_ATTRIBUTE);
            expect(schemeAttributeValue).toBeNull()
          });
        });
      });
    });
    describe('when user prefers dark color scheme', () => {
      beforeEach(() => {
        prefersDark = true;
      });
      describe('when no color scheme is manually set', () => {
        it('should manually set the scheme to light', () => {
          sut.toggleDarkLight();

          const schemeAttributeValue = documentElement.getAttribute(ColorSchemeService.HTML_ATTRIBUTE);
          expect(schemeAttributeValue).toBe(Schemes.Light)
        });
      });
      describe('when color scheme is manually set', () => {
        describe('when set to light', () => {
          beforeEach(() => {
            documentElement.setAttribute(ColorSchemeService.HTML_ATTRIBUTE, Schemes.Light);
          })
          it('should remove the manual scheme preference to go back to light', () => {
            sut.toggleDarkLight();

            const schemeAttributeValue = documentElement.getAttribute(ColorSchemeService.HTML_ATTRIBUTE);
            expect(schemeAttributeValue).toBeNull()
          });
        });
        describe('when set to dark', () => {
          beforeEach(() => {
            documentElement.setAttribute(ColorSchemeService.HTML_ATTRIBUTE, Schemes.Dark);
          })
          it('should manually set the scheme to light', () => {
            sut.toggleDarkLight();

            const schemeAttributeValue = documentElement.getAttribute(ColorSchemeService.HTML_ATTRIBUTE);
            expect(schemeAttributeValue).toBe(Schemes.Light)
          });
        });
      });
    });
  });
});
