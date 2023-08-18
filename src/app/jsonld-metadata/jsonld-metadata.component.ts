import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { JSON_LD } from '../metadata';

@Component({
  selector: 'app-jsonld-metadata',
  template: '',
})
export class JsonldMetadataComponent implements OnInit {
  constructor(
    @Inject(DOCUMENT) private document: Document
  ) {
  }

  ngOnInit(): void {
    this.appendJsonLdScript();
  }

  // Right now just appends, as we only add this once. If adding more to overwrite main one, should be changed to
  // replace instead of add, probably.
  private appendJsonLdScript() {
    const jsonLdScript = this.document.createElement('script');
    jsonLdScript.type = 'application/ld+json';
    jsonLdScript.innerHTML = JSON.stringify(JSON_LD);

    const head = this.document.getElementsByTagName('head')[0];
    head.appendChild(jsonLdScript);
  }
}
