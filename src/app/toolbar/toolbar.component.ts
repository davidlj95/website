import { DOCUMENT } from "@angular/common";
import { Component, HostBinding, Inject } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  private static readonly THEME_ATTRIBUTE = 'data-theme';

  @HostBinding('attr.role') ariaRole = 'toolbar';

  constructor(
    @Inject(DOCUMENT) private document: Document,
  ) {
  }

  toggleTheme() {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    prefersDark ? this.toggleHtmlTheme('light') : this.toggleHtmlTheme('dark');
  }

  private toggleHtmlTheme(theme: string) {
    const htmlElement = this.document.documentElement;
    if (htmlElement.getAttribute(ToolbarComponent.THEME_ATTRIBUTE)) {
      htmlElement.removeAttribute(ToolbarComponent.THEME_ATTRIBUTE)
    } else {
      htmlElement.setAttribute(ToolbarComponent.THEME_ATTRIBUTE, theme);
    }
  }
}
