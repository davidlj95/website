import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from "@angular/common";
import { TabId } from "../navigation-tabs/navigation-tabs.component";

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss']
})
export class WindowComponent implements OnInit {
  public noScriptCssClass = 'hideIfNoScript';
  public selectedTab: TabId = 'contact';

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
