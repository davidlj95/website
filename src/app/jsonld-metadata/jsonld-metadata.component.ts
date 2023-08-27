import { DOCUMENT } from '@angular/common';
import { Component, Inject, InjectionToken, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { METADATA } from '../metadata';

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
      'name': METADATA.realName,
      'url': METADATA.authorUrl,
    },
    'name': METADATA.siteName,
    'headline': METADATA.description,
    'url': environment.canonicalUrl,
  }
  public static readonly JSON_LD_IT = new InjectionToken<unknown>('JSON LD metadata', {
    factory: () => JsonldMetadataComponent.JSON_LD
  })

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(JsonldMetadataComponent.JSON_LD_IT) private jsonLd: unknown,
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
    jsonLdScript.innerHTML = JSON.stringify(this.jsonLd);

    const head = this.document.getElementsByTagName('head')[0];
    head.appendChild(jsonLdScript);
  }
}
