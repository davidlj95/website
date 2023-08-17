import { DOCUMENT } from "@angular/common";
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  constructor(
    @Inject(DOCUMENT) private document: Document,
  ) {
  }

  toggleTheme() {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const body = this.document.body;
    if (prefersDark) {
      body.classList.toggle('light');
    } else {
      body.classList.toggle('dark');
    }
  }
}
