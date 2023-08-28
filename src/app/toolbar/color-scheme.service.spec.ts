import { DOCUMENT } from '@angular/common';
import { EventEmitter } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MockProvider } from 'ng-mocks';
import { Subscription } from 'rxjs';
import { WINDOW } from '../common/injection-tokens';
import { ColorSchemeService, Scheme } from './color-scheme.service';

describe('ColorSchemeService', () => {
  let sut: ColorSchemeService;
  let documentElement: HTMLElement;
  let mockWindow: Window;
  const mockMatchMedia: typeof Window.prototype.matchMedia = (query) => {
    // Most future-friendly way is to ask whether user prefers dark or not
    // As other preferences (like sepia) may be introduced in the future.
    // https://www.w3.org/TR/mediaqueries-5/#prefers-color-scheme
    if (query === '(prefers-color-scheme: dark)') {
      return {
        matches: prefersDark,
        addEventListener: <K extends keyof MediaQueryListEventMap>(
          type: K,
          listener: (ev: MediaQueryListEventMap[K]) => unknown,
          options?: boolean | AddEventListenerOptions) => {
          if (type !== 'change' || options !== undefined || typeof listener !== 'function') {
            throw new Error('Media query addEventListener cannot be mocked with this usage')
          }
          prefersDarkMatchMediaSubscriptions.push(
            prefersDarkMatchMediaChangesEmitter.subscribe(listener)
          )
        },
      } as MediaQueryList;
    }
    throw new Error('Media query not mocked')
  }
  let prefersDark: boolean;
  let prefersDarkMatchMediaChangesEmitter: EventEmitter<MediaQueryListEvent>;
  let prefersDarkMatchMediaSubscriptions: Array<Subscription>;

  beforeEach(() => {
    prefersDark = false;
    prefersDarkMatchMediaChangesEmitter = new EventEmitter<MediaQueryListEvent>();
    prefersDarkMatchMediaSubscriptions = [];
    mockWindow = ({matchMedia: mockMatchMedia} as Pick<Window, "matchMedia">) as Window;
    TestBed.configureTestingModule({
      providers: [
        MockProvider(WINDOW, () => mockWindow, "useFactory"),
      ]
    });
    documentElement = TestBed.inject(DOCUMENT).documentElement;
  });
  afterEach(() => {
    prefersDarkMatchMediaSubscriptions.forEach((subscription) => subscription.unsubscribe());
    sut && documentElement.removeAttribute(sut.htmlAttribute);
  });

  it('should be created', () => {
    expect(TestBed.inject(ColorSchemeService)).toBeTruthy();
  });

  describe('when user preference changes', () => {
    const manuallySetScheme = Scheme.Dark;

    describe('when can detect system preference', () => {
      beforeEach(() => {
        sut = TestBed.inject(ColorSchemeService);
        documentElement.setAttribute(sut.htmlAttribute, manuallySetScheme);
      })
      it('should remove the manual scheme preference to reflect change (if applies)', () => {
        expect(documentElement.getAttribute(sut.htmlAttribute)).toBe(manuallySetScheme);

        prefersDarkMatchMediaChangesEmitter.emit({} as MediaQueryListEvent);

        expect(documentElement.getAttribute(sut.htmlAttribute)).toBeNull()
      });
    });

    describe('when cannot detect system preference', () => {
      beforeEach(() => {
        mockWindow = {} as Window;
        sut = TestBed.inject(ColorSchemeService);
        documentElement.setAttribute(sut.htmlAttribute, manuallySetScheme);
      })
      it('should do nothing', () => {
        expect(documentElement.getAttribute(sut.htmlAttribute)).toBe(manuallySetScheme);

        prefersDarkMatchMediaChangesEmitter.emit({} as MediaQueryListEvent);

        expect(documentElement.getAttribute(sut.htmlAttribute)).toBe(manuallySetScheme);
      });
    });
  })

  describe('#toggleDarkLight', () => {
    beforeEach(() => {
      sut = TestBed.inject(ColorSchemeService);
    })
    describe('when no color scheme has been manually set', () => {
      describe('when cannot detect system preference', () => {
        beforeEach(() => {
          mockWindow = {} as Window;
        });
        it('should manually set the scheme to dark, given default is light', () => {
          sut.toggleDarkLight();

          const schemeAttributeValue = documentElement.getAttribute(sut.htmlAttribute);
          expect(schemeAttributeValue).toBe(Scheme.Dark)
        });
      });
      describe('when user does not prefer dark color scheme', () => {
        beforeEach(() => {
          prefersDark = false;
        });
        it('should manually set the scheme to dark', () => {
          sut.toggleDarkLight();

          const schemeAttributeValue = documentElement.getAttribute(sut.htmlAttribute);
          expect(schemeAttributeValue).toBe(Scheme.Dark)
        });
      });
      describe('when user prefers dark color scheme', () => {
        beforeEach(() => {
          prefersDark = true;
        });
        it('should manually set the scheme to light', () => {
          sut.toggleDarkLight();

          const schemeAttributeValue = documentElement.getAttribute(sut.htmlAttribute);
          expect(schemeAttributeValue).toBe(Scheme.Light)
        });
      });
    });
    describe('when color scheme is manually set', () => {
      describe('when set to light', () => {
        beforeEach(() => {
          documentElement.setAttribute(sut.htmlAttribute, Scheme.Light);
        })
        it('should manually set the scheme to dark', () => {
          sut.toggleDarkLight();

          const schemeAttributeValue = documentElement.getAttribute(sut.htmlAttribute);
          expect(schemeAttributeValue).toBe(Scheme.Dark)
        });
      });
      describe('when set to dark', () => {
        beforeEach(() => {
          documentElement.setAttribute(sut.htmlAttribute, Scheme.Dark);
        })
        it('should manually set the scheme to light', () => {
          sut.toggleDarkLight();

          const schemeAttributeValue = documentElement.getAttribute(sut.htmlAttribute);
          expect(schemeAttributeValue).toBe(Scheme.Light)
        });
      });
    });
  });

  describe('#setColorScheme', () => {
    it('should manually set the scheme as an HTML tag attribute', () => {
      sut = TestBed.inject(ColorSchemeService)
      expect(documentElement.getAttribute(sut.htmlAttribute)).toBeNull()
      const randomScheme = Scheme.Dark;

      sut.setManual(randomScheme);

      expect(documentElement.getAttribute(sut.htmlAttribute)).toBe(randomScheme)
    })
  })


  describe('#setSystemColorScheme', () => {
    it('should remove the manually set scheme as an HTML tag attribute', () => {
      sut = TestBed.inject(ColorSchemeService)
      const randomScheme = Scheme.Dark;
      documentElement.setAttribute(sut.htmlAttribute, randomScheme)

      sut.setSystem()

      expect(documentElement.getAttribute(sut.htmlAttribute)).toBeNull()
    })
  })
})
