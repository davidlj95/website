import { DOCUMENT } from '@angular/common'
import { VERSION } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { EmptyComponent } from './helpers/empty-component'
import { RouterTestingHarness } from '@angular/router/testing'
import { provideRouter } from '@angular/router'
import { APP_MODULE_METADATA_IMPORTS } from '../app/app.module'
import { NgxMetaRouteData } from '@davidlj95/ngx-meta/routing'
import { GlobalMetadata, MetadataValues } from '@davidlj95/ngx-meta/core'
import { StandardMetadata } from '@davidlj95/ngx-meta/standard'
import {
  OPEN_GRAPH_TYPE_WEBSITE,
  OpenGraphMetadata,
} from '@davidlj95/ngx-meta/open-graph'
import {
  TWITTER_CARD_TYPE_SUMMARY,
  TwitterCardMetadata,
} from '@davidlj95/ngx-meta/twitter-card'
import { METADATA_DEFAULTS } from '../app/app.metadata-defaults'

describe('App SEO metadata', () => {
  let headElement: HTMLHeadElement
  let htmlElement: HTMLElement

  describe('By default', () => {
    beforeEach(async () => {
      const document = await makeSut()
      headElement = document.head
      htmlElement = document.documentElement
    })

    describe('Standard metas', () => {
      shouldSetTitle(METADATA_DEFAULTS.title)
      shouldSetHtmlLangAttribute(METADATA_DEFAULTS.locale)
      shouldIncludeMetaWithName(
        'application-name',
        METADATA_DEFAULTS.applicationName,
      )
      shouldIncludeMetaWithName('author', METADATA_DEFAULTS.standard.author)
      shouldIncludeMetaWithName(
        'generator',
        jasmine.stringContaining('Angular'),
        'containing Angular as framework',
      )
      shouldIncludeMetaWithName(
        'generator',
        jasmine.stringContaining(VERSION.full),
        'containing Angular version',
      )
    })

    describe('Open Graph', () => {
      shouldIncludeMetaWithProperty('og:type', METADATA_DEFAULTS.openGraph.type)
    })

    describe('Twitter Card', () => {
      shouldIncludeMetaWithName(
        'twitter:card',
        METADATA_DEFAULTS.twitterCard.card,
      )
      shouldIncludeMetaWithName(
        'twitter:creator',
        METADATA_DEFAULTS.twitterCard.creator.username,
      )
      shouldIncludeMetaWithName(
        'twitter:site',
        METADATA_DEFAULTS.twitterCard.site.username,
      )
    })
  })

  describe('When specified in a route', () => {
    const routeMetadata = {
      title: 'Sample title',
      description: 'Sample description',
      image: {
        url: new URL('https://example.org/image.png'),
        alt: 'Sample image description',
      },
      applicationName: 'Sample app',
      locale: 'pt',
      canonicalUrl: new URL('https://example.org/canonical'),
      standard: {
        author: 'John Doe',
        keywords: ['foo', 'bar'],
        generator: true,
      },
      openGraph: {
        type: OPEN_GRAPH_TYPE_WEBSITE,
        image: {
          width: 875,
          height: 875,
        },
      },
      twitterCard: {
        card: TWITTER_CARD_TYPE_SUMMARY,
        site: { username: '@johnDoeTheSite' },
        creator: { username: '@johnDoeTheAuthor' },
      },
    } satisfies GlobalMetadata &
      StandardMetadata &
      OpenGraphMetadata &
      TwitterCardMetadata

    beforeEach(async () => {
      const document = await makeSut({ routeMetadata })
      headElement = document.head
      htmlElement = document.documentElement
    })

    describe('Standard metas', () => {
      shouldSetTitle(routeMetadata.title)
      shouldIncludeMetaWithName('description', routeMetadata.description)
      shouldIncludeMetaWithName(
        'keywords',
        routeMetadata.standard.keywords.join(','),
      )
      shouldIncludeMetaWithName('author', routeMetadata.standard.author)
      shouldIncludeMetaWithName(
        'application-name',
        routeMetadata.applicationName,
      )
      it('should include canonical URL link element', () => {
        const canonicalLinkElement = headElement.querySelector(
          `link[rel="canonical"]`,
        )
        expect(canonicalLinkElement).not.toBeNull()
        expect(canonicalLinkElement?.getAttribute('href')).toEqual(
          routeMetadata.canonicalUrl.toString(),
        )
      })
    })

    describe('Open Graph', () => {
      shouldIncludeMetaWithProperty('og:title', routeMetadata.title)
      shouldIncludeMetaWithProperty(
        'og:url',
        routeMetadata.canonicalUrl.toString(),
      )
      shouldIncludeMetaWithProperty('og:type', routeMetadata.openGraph.type)
      shouldIncludeMetaWithProperty(
        'og:image',
        routeMetadata.image.url.toString(),
      )
      shouldIncludeMetaWithProperty('og:image:alt', routeMetadata.image.alt)
      shouldIncludeMetaWithProperty(
        'og:image:width',
        routeMetadata.openGraph.image.width.toString(),
      )
      shouldIncludeMetaWithProperty(
        'og:image:height',
        routeMetadata.openGraph.image.height.toString(),
      )
      shouldIncludeMetaWithProperty('og:locale', routeMetadata.locale)
      shouldIncludeMetaWithProperty(
        'og:site_name',
        routeMetadata.applicationName,
      )
    })

    describe('Twitter', () => {
      shouldIncludeMetaWithName('twitter:title', routeMetadata.title)
      shouldIncludeMetaWithName(
        'twitter:description',
        routeMetadata.description,
      )
      shouldIncludeMetaWithName(
        'twitter:image',
        routeMetadata.image.url.toString(),
      )
      shouldIncludeMetaWithName('twitter:image:alt', routeMetadata.image.alt)
      shouldIncludeMetaWithName(
        'twitter:site',
        routeMetadata.twitterCard.site.username,
      )
      shouldIncludeMetaWithName(
        'twitter:creator',
        routeMetadata.twitterCard.creator.username,
      )
      shouldIncludeMetaWithName('twitter:card', routeMetadata.twitterCard.card)
    })
  })

  // See defaults code. Removed until available in lib
  // describe('Facebook', () => {
  //   ensureMetaTagPresentWithProperty(
  //     'fb:admins',
  //     metadata.nickname,
  //     'with nickname from metadata',
  //   )
  //   ensureMetaTagPresentWithName('facebook-domain-verification')
  // })

  function shouldSetTitle(expectedTitle: string) {
    it('should set title', () => {
      const titleElement = headElement.querySelector('title')
      expect(titleElement).not.toBeNull()
      expect(titleElement?.innerText).toEqual(expectedTitle)
    })
  }

  function shouldSetHtmlLangAttribute(expectedLocale: string) {
    it("should set HTML element's lang attribute", () => {
      const langAttribute = htmlElement.getAttribute('lang')
      expect(langAttribute).toEqual(expectedLocale)
    })
  }

  function shouldIncludeMetaWithName(
    name: string,
    expectedContent?: jasmine.Expected<string>,
    expectedContentDescription?: string,
  ) {
    shouldIncludeMeta('name', name, expectedContent, expectedContentDescription)
  }

  function shouldIncludeMetaWithProperty(
    property: string,
    expectedContent?: jasmine.Expected<string>,
    expectedContentDescription?: string,
  ) {
    shouldIncludeMeta(
      'property',
      property,
      expectedContent,
      expectedContentDescription,
    )
  }
  function shouldIncludeMeta(
    keyAttributeName: string,
    keyAttributeValue: string,
    expectedContent?: jasmine.Expected<string>,
    expectedContentDescription?: string,
  ) {
    const keyAttributeDescription = `with ${keyAttributeName} '${keyAttributeValue}'`
    it(`should include meta element ${keyAttributeDescription} ${expectedContentDescription ?? ''}`, () => {
      const metaElement = headElement.querySelector(
        `meta[${keyAttributeName}="${keyAttributeValue}"]`,
      )
      expect(metaElement).not.toBeNull()
      if (expectedContent) {
        expect(metaElement?.getAttribute('content')).toEqual(expectedContent)
      }
    })
  }
})
async function makeSut(opts: { routeMetadata?: MetadataValues } = {}) {
  TestBed.configureTestingModule({
    providers: [
      provideRouter([
        {
          path: '',
          component: EmptyComponent,
          data: opts.routeMetadata
            ? ({
                meta: opts.routeMetadata,
              } satisfies NgxMetaRouteData)
            : undefined,
        },
      ]),
    ],
    imports: APP_MODULE_METADATA_IMPORTS,
  })
  await RouterTestingHarness.create('/')
  return TestBed.inject(DOCUMENT)
}
