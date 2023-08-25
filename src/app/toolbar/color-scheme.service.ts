import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { WINDOW } from '../common/window-injection-token';

// Ensure in SCSS styles that these values alter the color scheme
export enum Schemes {
  Light = 'light',
  Dark = 'dark',
}

@Injectable({
  providedIn: 'root'
})
export class ColorSchemeService {
  // Ensure in SCSS styles that this attribute in <html> changes color schemes accordingly
  public htmlAttribute = 'data-color-scheme';

  private documentElement: HTMLElement;

  constructor(
    @Inject(DOCUMENT) document: Document,
    @Inject(WINDOW) private window: Window,
  ) {
    this.documentElement = document.documentElement;
    this.listenForMatchMediaPreferenceChanges();
  }

  private get userPrefersDark(): boolean {
    return !!this.matchMediaQuery && this.matchMediaQuery.matches;
  }

  private get matchMediaQuery() {
    if (!this.window.matchMedia) {
      return null;
    }
    return this.window.matchMedia('(prefers-color-scheme: dark)');
  }

  toggleDarkLight() {
    const manuallySetScheme = this.documentElement.getAttribute(this.htmlAttribute);
    if (!manuallySetScheme) {
      this.documentElement.setAttribute(this.htmlAttribute, this.userPrefersDark ? Schemes.Light : Schemes.Dark);
      return;
    }

    this.documentElement.setAttribute(
      this.htmlAttribute,
      manuallySetScheme == Schemes.Light ? Schemes.Dark : Schemes.Light
    );
  }

  private listenForMatchMediaPreferenceChanges() {
    this.matchMediaQuery?.addEventListener('change', () => {
      this.documentElement.removeAttribute(this.htmlAttribute);
    })
  }
}
