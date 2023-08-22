import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { MockProvider } from 'ng-mocks';
import { WINDOW } from '../common/window-injection-token';
import { ColorSchemeService, Schemes } from './color-scheme.service';

describe('ColorSchemeService', () => {
  let service: ColorSchemeService;
  let document: Document;
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

    service = TestBed.inject(ColorSchemeService);
    document = TestBed.inject(DOCUMENT);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#toggleDarkLight', () => {
    afterEach(() => {
      document.documentElement.removeAttribute(ColorSchemeService.HTML_ATTRIBUTE);
    })
    describe('when a color scheme has been manually set', () => {
      beforeEach(() => {
        document.documentElement.setAttribute(ColorSchemeService.HTML_ATTRIBUTE, Schemes.Dark)
      })
      it('should remove the manual color scheme set', () => {
        service.toggleDarkLight();

        const schemeAttributeValue = document.documentElement.getAttribute(ColorSchemeService.HTML_ATTRIBUTE);
        expect(schemeAttributeValue).toBeNull()
      });
    });
    describe('when no color scheme has been manually set', () => {
      describe('when user does not prefer dark color scheme', () => {
        beforeEach(() => {
          prefersDark = false;
        });
        it('should manually set the scheme to dark', () => {
          service.toggleDarkLight();

          const schemeAttributeValue = document.documentElement.getAttribute(ColorSchemeService.HTML_ATTRIBUTE);
          expect(schemeAttributeValue).toBe(Schemes.Dark)
        });
      });
      describe('when user prefers dark color scheme', () => {
        beforeEach(() => {
          prefersDark = true;
        });
        it('should manually set the scheme to light', () => {
          service.toggleDarkLight();

          const schemeAttributeValue = document.documentElement.getAttribute(ColorSchemeService.HTML_ATTRIBUTE);
          expect(schemeAttributeValue).toBe(Schemes.Light)
        });
      });
    })
  });
});
