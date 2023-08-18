import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { AUTHOR_URL, DESCRIPTION, REALNAME, SITENAME } from '../metadata';

@Component({
  selector: 'app-jsonld-metadata',
  template: '',
})
export class JsonldMetadataComponent implements OnInit {
  private static readonly JSON_LD = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'author': {
      '@type': 'Person',
      'name': REALNAME,
      'url': AUTHOR_URL,
    },
    'name': SITENAME,
    'headline': DESCRIPTION,
    'url': environment.canonicalUrl,
  }

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
    jsonLdScript.innerHTML = JSON.stringify(JsonldMetadataComponent.JSON_LD);

    const head = this.document.getElementsByTagName('head')[0];
    head.appendChild(jsonLdScript);
  }
}
