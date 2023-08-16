import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  phone = '+34 644 449 360';
  email = 'mail@davidlj95.com';
  github_url = 'https://github.com/davidlj95';
  stackoverflow_url = 'https://stackoverflow.com/users/3263250/davidlj95';
  linkedin_url = 'https://www.linkedin.com/in/davidlj95';
  keybase_url = 'https://keybase.io/davidlj95';
  twitter_url = 'https://twitter.com.com/davidlj95';
  instagram_url = 'https://www.instagram.com/davidlj95';
  facebook_url = 'https://www.facebook.com/davidlj95';
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
