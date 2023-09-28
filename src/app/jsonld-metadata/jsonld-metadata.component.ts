import { DOCUMENT } from '@angular/common'
import { Component, Inject, OnInit } from '@angular/core'
import { Environment } from '../../environments'
import { ENVIRONMENT, METADATA } from '../common/injection-tokens'
import { Metadata } from '../metadata'

@Component({
  selector: 'app-jsonld-metadata',
  template: '',
})
export class JsonldMetadataComponent implements OnInit {
  // @visibleForTesting
  public readonly jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    author: {
      '@type': 'Person',
      name: this.metadata.realName,
      url: this.metadata.authorUrl,
    },
    name: this.metadata.siteName,
    headline: this.metadata.description,
    url: this.environment.canonicalUrl,
  }

  constructor(
    @Inject(METADATA) private metadata: Metadata,
    @Inject(ENVIRONMENT) private environment: Environment,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  ngOnInit(): void {
    this.appendJsonLdScript()
  }

  // Right now just appends, as we only add this once. If adding more to overwrite main one, should be changed to
  // replace instead of add, probably.
  private appendJsonLdScript() {
    const jsonLdScript = this.document.createElement('script')
    jsonLdScript.type = 'application/ld+json'
    jsonLdScript.innerHTML = JSON.stringify(this.jsonLd)

    this.document.head.appendChild(jsonLdScript)
  }
}
