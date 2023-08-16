import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  resume_url = 'https://resume.davidlj95.com';
  noScriptCssClass = 'hideIfNoScript';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: string,
  ) {
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.displayJavascriptPoweredElements();
    }
  }

  private displayJavascriptPoweredElements() {
    const scriptPoweredElements = this.document.querySelectorAll(`.${this.noScriptCssClass}`);
    scriptPoweredElements.forEach((element) => {
      element.classList.remove(this.noScriptCssClass);
    });
  }
}
