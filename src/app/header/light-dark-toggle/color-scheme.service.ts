import { DOCUMENT } from '@angular/common'
import { Inject, Injectable } from '@angular/core'
import { WINDOW } from '@/common/injection-tokens'

// Ensure in SCSS styles that these values alter the color scheme
// Partially enforced by color scheme tests in color-scheme.spec.ts
export enum Scheme {
  Light = 'light',
  Dark = 'dark',
}

@Injectable({
  providedIn: 'root',
})
export class ColorSchemeService {
  private _htmlElement: HTMLElement

  constructor(
    @Inject(DOCUMENT) document: Document,
    @Inject(WINDOW) private _window: Window,
  ) {
    this._htmlElement = document.documentElement
    this.listenForMatchMediaPreferenceChanges()
  }

  private get isDarkPreferred(): boolean {
    return !!this.matchMediaQuery && this.matchMediaQuery.matches
  }

  private get matchMediaQuery() {
    if (!this._window.matchMedia) {
      return null
    }
    return this._window.matchMedia('(prefers-color-scheme: dark)')
  }

  toggleDarkLight() {
    const manuallySetScheme = this._htmlElement.getAttribute(
      HTML_COLOR_SCHEME_ATTRIBUTE,
    )
    if (!manuallySetScheme) {
      this.setManual(this.isDarkPreferred ? Scheme.Light : Scheme.Dark)
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

  private listenForMatchMediaPreferenceChanges() {
    this.matchMediaQuery?.addEventListener('change', () => {
      this.setSystem()
    })
  }
}

// Ensure in SCSS styles that this attribute in <html> changes color schemes accordingly
// Partially enforced by color scheme tests in color-scheme.spec.ts
export const HTML_COLOR_SCHEME_ATTRIBUTE = 'data-color-scheme'
