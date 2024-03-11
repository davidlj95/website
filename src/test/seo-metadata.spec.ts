import { DOCUMENT } from '@angular/common'
import { EventEmitter, VERSION } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import {
  Event as RouterEmittedEvent,
  NavigationEnd,
  Router,
  RouterState,
} from '@angular/router'
import { MockProvider } from 'ng-mocks'
import { AppModule } from '../app/app.module'
import { Metadata, METADATA } from '../app/metadata'
import { Environment, environment as appEnv } from '../environments'
import { EmptyComponent } from './helpers/empty-component'

describe('App SEO metadata', () => {
  let headElement: HTMLElement
  // We can't fake it since it is configured at module level with imports as we can't use a service there
  // because the system hasn't started yet. Maybe it could be done somehow, though not sure how to at this point.
  const metadata: Metadata = METADATA
  const environment: Environment = appEnv

  beforeEach(async () => {
    const routerEventsEmitter = new EventEmitter<RouterEmittedEvent>()
    // All that jazz so that @davidlj95/ngx-meta doesn't complain
    const mockRouter = {
      events: routerEventsEmitter,
      routerState: {
        root: { firstChild: null, snapshot: { data: {} } },
      } as RouterState,
    } as Pick<Router, 'events' | 'routerState'> as Router

    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [MockProvider(Router, mockRouter)],
    })

    // Component not needed, so let's put a dummy one
    TestBed.createComponent(EmptyComponent)

    // For @davidlj95/ngx-meta to work we need a "NavigationEnd" event triggered
    // Didn't know how to do it otherwise. Suggestions accepted :P (have an idea, will implement later)
    routerEventsEmitter.emit(new NavigationEnd(0, '', ''))

    const document = TestBed.inject(DOCUMENT)
    headElement = document.head
  })

  describe('Basic metas', () => {
    it('should set proper title', () => {
      const titleElement = headElement.querySelector('title')
      expect(titleElement?.innerText).toEqual(metadata.siteName)
    })
    ensureMetaTagPresentWithName(
      'description',
      metadata.description,
      'with description from metadata as value',
    )
    ensureMetaTagPresentWithName(
      'keywords',
      jasmine.stringContaining(metadata.realName),
      'containing real name from metadata',
    )
    ensureMetaTagPresentWithName(
      'keywords',
      jasmine.stringContaining(metadata.nickname),
      'containing nickname from metadata',
    )
    it("should include meta tag with name 'keywords' and a list of at least two comma separated items", () => {
      const keywordsMetaElement = headElement.querySelector(
        `meta[name="keywords"]`,
      )
      expect(keywordsMetaElement).not.toBeNull()
      const keywordsText = keywordsMetaElement?.getAttribute('content')
      expect(keywordsText).not.toBeNull()
      const keywords = keywordsText?.split(',')
      expect(keywords?.length).toBeGreaterThan(1)
    })

    ensureMetaTagPresentWithName(
      'author',
      metadata.nickname,
      'with nickname from metadata',
    )
    ensureMetaTagPresentWithName(
      'generator',
      jasmine.stringContaining('Angular'),
      'containing Angular as framework',
    )
    ensureMetaTagPresentWithName(
      'generator',
      jasmine.stringContaining(VERSION.full),
      'containing Angular version',
    )
    ensureMetaTagPresentWithName(
      'application-name',
      metadata.siteName,
      'with site name from metadata',
    )
    // Will be fixed in next PR
    //it('should include canonical URL link element with environment config', () => {
    //  const canonicalLinkElement = headElement.querySelector(
    //    `link[rel="canonical"]`,
    //  )
    //  expect(canonicalLinkElement).not.toBeNull()
    //  expect(canonicalLinkElement?.getAttribute('href')).toEqual(
    //    environment.canonicalUrl.toString(),
    //  )
    //})
  })
  describe('Open Graph', () => {
    ensureMetaTagPresentWithProperty(
      'og:title',
      metadata.siteName,
      'with site name from metadata',
    )
    // Will be fixed in next PR
    // ensureMetaTagPresentWithProperty(
    //   'og:url',
    //   environment.canonicalUrl.toString(),
    //   'with canonical url from environment',
    // )
    ensureMetaTagPresentWithProperty('og:type', 'website')
    ensureMetaTagPresentWithProperty(
      'og:image',
      new URL('assets/img/og.jpg', environment.canonicalUrl).toString(),
      'pointing to the OG image',
    )
    ensureMetaTagPresentWithProperty('og:image:alt')
    ensureMetaTagPresentWithProperty('og:image:width', '875')
    ensureMetaTagPresentWithProperty('og:image:height', '875')
    ensureMetaTagPresentWithProperty('og:image:type', 'image/jpeg')
    ensureMetaTagPresentWithProperty('og:locale', 'en')
    ensureMetaTagPresentWithProperty(
      'og:site_name',
      metadata.siteName,
      'with site name from metadata',
    )
  })
  describe('Twitter', () => {
    ensureMetaTagPresentWithName(
      'twitter:title',
      metadata.siteName,
      'with site name from metadata',
    )
    ensureMetaTagPresentWithName(
      'twitter:description',
      metadata.description,
      'with description from metadata',
    )
    ensureMetaTagPresentWithName(
      'twitter:image',
      new URL('assets/img/og.jpg', environment.canonicalUrl).toString(),
      'pointing to the OG image',
    )
    ensureMetaTagPresentWithName('twitter:image:alt')
    ensureMetaTagPresentWithName(
      'twitter:site',
      `@${metadata.nickname}`,
      'with nickname from metadata preceded by @',
    )
    ensureMetaTagPresentWithName(
      'twitter:creator',
      `@${metadata.nickname}`,
      'with nickname from metadata preceded by @',
    )
    ensureMetaTagPresentWithName('twitter:card')
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

  function ensureMetaTagPresentWithName(
    name: string,
    expectedContent?: jasmine.Expected<string>,
    expectedContentDescription?: string,
  ) {
    ensureMetaTagPresent(
      'name',
      name,
      expectedContent,
      expectedContentDescription,
    )
  }

  function ensureMetaTagPresentWithProperty(
    property: string,
    expectedContent?: jasmine.Expected<string>,
    expectedContentDescription?: string,
  ) {
    ensureMetaTagPresent(
      'property',
      property,
      expectedContent,
      expectedContentDescription,
    )
  }
  function ensureMetaTagPresent(
    keyAttributeName: string,
    keyAttributeValue: string,
    expectedContent?: jasmine.Expected<string>,
    expectedContentDescription?: string,
  ) {
    const keyAttributeDescription = `with ${keyAttributeName} '${keyAttributeValue}'`
    const expectedValueDescription = expectedContentDescription
      ? expectedContentDescription
      : expectedContent
        ? `and value '${expectedContent}'`
        : ''
    it(`should include meta element ${keyAttributeDescription} ${expectedValueDescription}`, () => {
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
