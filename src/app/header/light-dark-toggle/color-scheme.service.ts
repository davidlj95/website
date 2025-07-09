import { Injectable, DOCUMENT, inject } from '@angular/core'
import { WINDOW } from '@/common/injection-tokens'

// Ensure in SCSS styles that these values alter the color scheme
// Partially enforced by color scheme tests in color-scheme.spec.ts
/** @visibleForTesting */
export enum Scheme {
  Light = 'light',
  Dark = 'dark',
}

@Injectable({
  providedIn: 'root',
})
export class ColorSchemeService {
  private _window = inject<Window>(WINDOW)

  private _htmlElement: HTMLElement

  constructor() {
    const document = inject<Document>(DOCUMENT)

    this._htmlElement = document.documentElement
    this._listenForMatchMediaPreferenceChanges()
  }

  private get _isDarkPreferred(): boolean {
    return !!this._matchMediaQuery && this._matchMediaQuery.matches
  }

  private get _matchMediaQuery() {
    if (!this._window.matchMedia) {
      return null
    }
    return this._window.matchMedia('(prefers-color-scheme: dark)')
  }

  toggleDarkLight() {
    const manuallySetScheme = this._htmlElement.getAttribute(
      HTML_COLOR_SCHEME_ATTRIBUTE,
    ) as Scheme
    if (!manuallySetScheme) {
      this.setManual(this._isDarkPreferred ? Scheme.Light : Scheme.Dark)
      return
    }

    this.setManual(
      manuallySetScheme == Scheme.Light ? Scheme.Dark : Scheme.Light,
    )
  }

  setManual(scheme: Scheme) {
    this._htmlElement.setAttribute(HTML_COLOR_SCHEME_ATTRIBUTE, scheme)
  }

  setSystem() {
    this._htmlElement.removeAttribute(HTML_COLOR_SCHEME_ATTRIBUTE)
  }

  private _listenForMatchMediaPreferenceChanges() {
    this._matchMediaQuery?.addEventListener('change', () => {
      this.setSystem()
    })
  }
}

// Ensure in SCSS styles that this attribute in <html> changes color schemes accordingly
// Partially enforced by color scheme tests in color-scheme.spec.ts
/** @visibleForTesting */
export const HTML_COLOR_SCHEME_ATTRIBUTE = 'data-color-scheme'
