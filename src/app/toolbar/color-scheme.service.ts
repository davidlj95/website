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
  public static readonly HTML_ATTRIBUTE = 'data-color-scheme';

  private documentElement: HTMLElement;

  constructor(
    @Inject(DOCUMENT) document: Document,
    @Inject(WINDOW) private window: Window,
  ) {
    this.documentElement = document.documentElement;
  }

  toggleDarkLight() {
    // Remove manually toggled scheme if set
    if (this.documentElement.hasAttribute(ColorSchemeService.HTML_ATTRIBUTE)) {
      this.documentElement.removeAttribute(ColorSchemeService.HTML_ATTRIBUTE)
      return
    }

    // Set manual scheme
    const prefersDark = this.window.matchMedia && this.window.matchMedia('(prefers-color-scheme: dark)').matches
    this.documentElement.setAttribute(ColorSchemeService.HTML_ATTRIBUTE, prefersDark ? Schemes.Light : Schemes.Dark);
  }
}
