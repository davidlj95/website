import { DOCUMENT } from '@angular/common'
import { EventEmitter } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { MockProvider } from 'ng-mocks'
import { Subscription } from 'rxjs'
import { WINDOW } from '@/common/injection-tokens'
import {
  ColorSchemeService,
  HTML_COLOR_SCHEME_ATTRIBUTE,
  Scheme,
} from './color-scheme.service'

describe('ColorSchemeService', () => {
  let mockDocumentElement: HTMLElement
  let mockWindow: Window
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
          options?: boolean | AddEventListenerOptions,
        ) => {
          if (
            type !== 'change' ||
            options !== undefined ||
            typeof listener !== 'function'
          ) {
            throw new Error(
              'Media query addEventListener cannot be mocked with this usage',
            )
          }
          prefersDarkMatchMediaSubscriptions.push(
            prefersDarkMatchMediaChangesEmitter.subscribe(listener),
          )
        },
      } as MediaQueryList
    }
    throw new Error('Media query not mocked')
  }
  let prefersDark: boolean
  let prefersDarkMatchMediaChangesEmitter: EventEmitter<MediaQueryListEvent>
  let prefersDarkMatchMediaSubscriptions: Subscription[]

  beforeEach(() => {
    prefersDark = false
    prefersDarkMatchMediaChangesEmitter =
      new EventEmitter<MediaQueryListEvent>()
    prefersDarkMatchMediaSubscriptions = []
    mockWindow = { matchMedia: mockMatchMedia } as Pick<
      Window,
      'matchMedia'
    > as Window
    mockDocumentElement =
      new MockHTMLElementWithAttributes() as unknown as HTMLElement
    const mockDocument = {
      documentElement: mockDocumentElement,
      // Make Angular testing tools happy :)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      querySelectorAll: (_selectors: unknown) => {
        return { length: 0 }
      },
    } as Pick<Document, 'documentElement' | 'querySelectorAll'>
    TestBed.configureTestingModule({
      providers: [
        MockProvider(WINDOW, () => mockWindow, 'useFactory'),
        MockProvider(DOCUMENT, mockDocument),
      ],
    })
  })
  afterEach(() => {
    prefersDarkMatchMediaSubscriptions.forEach((subscription) =>
      subscription.unsubscribe(),
    )
  })

  it('should be created', () => {
    expect(TestBed.inject(ColorSchemeService)).toBeTruthy()
  })

  describe('when user preference changes', () => {
    const manuallySetScheme = Scheme.Dark

    describe('when can detect system preference', () => {
      it('should remove the manual scheme preference to reflect change (if applies)', () => {
        TestBed.inject(ColorSchemeService)
        mockDocumentElement.setAttribute(
          HTML_COLOR_SCHEME_ATTRIBUTE,
          manuallySetScheme,
        )

        prefersDarkMatchMediaChangesEmitter.emit({} as MediaQueryListEvent)

        expect(
          mockDocumentElement.getAttribute(HTML_COLOR_SCHEME_ATTRIBUTE),
        ).toBeNull()
      })
    })

    describe('when cannot detect system preference', () => {
      it('should do nothing', () => {
        mockWindow = {} as Window
        TestBed.inject(ColorSchemeService)
        mockDocumentElement.setAttribute(
          HTML_COLOR_SCHEME_ATTRIBUTE,
          manuallySetScheme,
        )

        prefersDarkMatchMediaChangesEmitter.emit({} as MediaQueryListEvent)

        expect(
          mockDocumentElement.getAttribute(HTML_COLOR_SCHEME_ATTRIBUTE),
        ).toBe(manuallySetScheme)
      })
    })
  })

  describe('#toggleDarkLight', () => {
    let sut: ColorSchemeService
    beforeEach(() => {
      sut = TestBed.inject(ColorSchemeService)
    })
    describe('when no color scheme has been manually set', () => {
      describe('when cannot detect system preference', () => {
        it('should manually set the scheme to dark, given default is light', () => {
          mockWindow = {} as Window
          sut.toggleDarkLight()

          const schemeAttributeValue = mockDocumentElement.getAttribute(
            HTML_COLOR_SCHEME_ATTRIBUTE,
          )
          expect(schemeAttributeValue).toBe(Scheme.Dark)
        })
      })
      describe('when user does not prefer dark color scheme', () => {
        it('should manually set the scheme to dark', () => {
          prefersDark = false
          sut.toggleDarkLight()

          const schemeAttributeValue = mockDocumentElement.getAttribute(
            HTML_COLOR_SCHEME_ATTRIBUTE,
          )
          expect(schemeAttributeValue).toBe(Scheme.Dark)
        })
      })
      describe('when user prefers dark color scheme', () => {
        it('should manually set the scheme to light', () => {
          prefersDark = true
          sut.toggleDarkLight()

          const schemeAttributeValue = mockDocumentElement.getAttribute(
            HTML_COLOR_SCHEME_ATTRIBUTE,
          )
          expect(schemeAttributeValue).toBe(Scheme.Light)
        })
      })
    })
    describe('when color scheme is manually set', () => {
      describe('when set to light', () => {
        it('should manually set the scheme to dark', () => {
          mockDocumentElement.setAttribute(
            HTML_COLOR_SCHEME_ATTRIBUTE,
            Scheme.Light,
          )
          sut.toggleDarkLight()

          const schemeAttributeValue = mockDocumentElement.getAttribute(
            HTML_COLOR_SCHEME_ATTRIBUTE,
          )
          expect(schemeAttributeValue).toBe(Scheme.Dark)
        })
      })
      describe('when set to dark', () => {
        it('should manually set the scheme to light', () => {
          mockDocumentElement.setAttribute(
            HTML_COLOR_SCHEME_ATTRIBUTE,
            Scheme.Dark,
          )
          sut.toggleDarkLight()

          const schemeAttributeValue = mockDocumentElement.getAttribute(
            HTML_COLOR_SCHEME_ATTRIBUTE,
          )
          expect(schemeAttributeValue).toBe(Scheme.Light)
        })
      })
    })
  })

  describe('#setColorScheme', () => {
    it('should manually set the scheme as an HTML tag attribute', () => {
      const sut = TestBed.inject(ColorSchemeService)
      expect(
        mockDocumentElement.getAttribute(HTML_COLOR_SCHEME_ATTRIBUTE),
      ).toBeNull()
      const randomScheme = Scheme.Dark

      sut.setManual(randomScheme)

      expect(
        mockDocumentElement.getAttribute(HTML_COLOR_SCHEME_ATTRIBUTE),
      ).toBe(randomScheme)
    })
  })

  describe('#setSystemColorScheme', () => {
    it('should remove the manually set scheme as an HTML tag attribute', () => {
      const sut = TestBed.inject(ColorSchemeService)
      const randomScheme = Scheme.Dark
      mockDocumentElement.setAttribute(
        HTML_COLOR_SCHEME_ATTRIBUTE,
        randomScheme,
      )

      sut.setSystem()

      expect(
        mockDocumentElement.getAttribute(HTML_COLOR_SCHEME_ATTRIBUTE),
      ).toBeNull()
    })
  })
})

// noinspection JSUnusedGlobalSymbols
class MockHTMLElementWithAttributes
  implements
    Pick<HTMLElement, 'getAttribute' | 'setAttribute' | 'removeAttribute'>
{
  private attributes = new Map<string, string>()

  getAttribute(qualifiedName: string) {
    return this.attributes.get(qualifiedName) ?? null
  }

  setAttribute(qualifiedName: string, value: string) {
    return this.attributes.set(qualifiedName, value)
  }

  removeAttribute(qualifiedName: string): void {
    this.attributes.delete(qualifiedName)
  }
}
