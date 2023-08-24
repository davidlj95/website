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

  private get userPreference(): Schemes {
    return this.userPrefersDark ? Schemes.Dark : Schemes.Light
  }

  private get userPrefersDark(): boolean {
    return this.window.matchMedia && this.window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  toggleDarkLight() {
    const manuallySetScheme = this.documentElement.getAttribute(ColorSchemeService.HTML_ATTRIBUTE);
    if (manuallySetScheme && manuallySetScheme !== this.userPreference) {
      this.documentElement.removeAttribute(ColorSchemeService.HTML_ATTRIBUTE);
      return;
    }

    this.documentElement.setAttribute(
      ColorSchemeService.HTML_ATTRIBUTE,
      this.userPrefersDark ? Schemes.Light : Schemes.Dark
    );
  }
}
