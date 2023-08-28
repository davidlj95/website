import { DOCUMENT } from '@angular/common';
import { EventEmitter, VERSION } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MetaDefinition } from '@angular/platform-browser';
import { Event as RouterEmittedEvent, NavigationEnd, Router, RouterState } from '@angular/router';
import { MockProvider } from 'ng-mocks';
import { AppModule } from '../app/app.module';
import { Metadata, METADATA } from '../app/metadata';
import { Environment, environment as appEnv } from '../environments';
import { EmptyComponent } from './helpers/empty-component';

describe('App SEO metadata', () => {
  let headElement: HTMLElement;
  // We can't fake it since it is configured at module level with imports as we can't use a service there
  // because the system hasn't started yet. Maybe it could be done somehow, though not sure how to at this point.
  const metadata: Metadata = METADATA;
  const environment: Environment = appEnv;

  beforeEach(async () => {
    const routerEventsEmitter = new EventEmitter<RouterEmittedEvent>();
    // All that jazz so that @ngaox/seo doesn't complain
    const mockRouter = {
      events: routerEventsEmitter,
      routerState: {root: {firstChild: null, snapshot: {}}} as RouterState,
    } as Pick<Router, 'events' | 'routerState'> as Router

    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [MockProvider(Router, mockRouter)],
    });

    // Component not needed, so let's put a dummy one
    TestBed.createComponent(EmptyComponent);

    // So @ngaox/seo does its magic we need a "NavigationEnd" event triggered
    // Didn't know how to do it otherwise. Suggestions accepted :P
    routerEventsEmitter.emit(new NavigationEnd(0, '', ''))

    const document = TestBed.inject(DOCUMENT);
    headElement = document.head;
  });

  describe('Basic metas', () => {
    ensureMetaTagPresentWithName(
      'title',
      metadata.siteName,
      'with site name from metadata as value',
    );
    ensureMetaTagPresentWithName(
      'description',
      metadata.description,
      'with description from metadata as value',
    );
    ensureMetaTagPresentWithName(
      'keywords',
      jasmine.stringContaining(metadata.realName),
      'containing real name from metadata',
    );
    ensureMetaTagPresentWithName(
      'keywords',
      jasmine.stringContaining(metadata.nickname),
      'containing nickname from metadata',
    );
    it("should include meta tag with name 'keywords' and a list of at least two comma separated items", () => {
      const keywordsMetaElement = headElement.querySelector(`meta[name="keywords"]`)
      expect(keywordsMetaElement).not.toBeNull()
      const keywordsText = keywordsMetaElement?.getAttribute('content')
      expect(keywordsText).not.toBeNull()
      const keywords = keywordsText?.split(",")
      expect(keywords?.length).toBeGreaterThan(1)
    })
    ensureMetaTagPresentWithName(
      'author',
      metadata.nickname,
      'with nickname from metadata',
    );
    ensureMetaTagPresentWithName(
      'generator',
      jasmine.stringContaining('Angular'),
      'containing Angular as framework',
    );
    ensureMetaTagPresentWithName(
      'generator',
      jasmine.stringContaining(VERSION.full),
      'containing Angular version',
    );
    ensureMetaTagPresentWithName(
      'application-name',
      metadata.siteName,
      'with site name from metadata',
    );
    it("should include canonical URL link element with environment config", () => {
      const canonicalLinkElement = headElement.querySelector(`link[rel="canonical"]`)
      expect(canonicalLinkElement).not.toBeNull()
      expect(canonicalLinkElement?.getAttribute('href')).toEqual(environment.canonicalUrl.toString());
    })
  })
  describe('Open Graph', () => {
    ensureMetaTagPresentWithProperty(
      'og:title',
      metadata.siteName,
      'with site name from metadata',
    );
    ensureMetaTagPresentWithProperty(
      'og:url',
      environment.canonicalUrl.toString(),
      'with canonical url from environment',
    );
    ensureMetaTagPresentWithProperty(
      'og:type',
      'website',
    );
    ensureMetaTagPresentWithProperty(
      'og:image',
      new URL('assets/img/og.jpg', environment.canonicalUrl).toString(),
      'pointing to the OG image',
    );
    ensureMetaTagPresentWithProperty(
      'og:image:alt',
    );
    ensureMetaTagPresentWithProperty(
      'og:image:width',
      '875',
    );
    ensureMetaTagPresentWithProperty(
      'og:image:height',
      '875',
    );
    ensureMetaTagPresentWithProperty(
      'og:image:type',
      'image/jpeg',
    );
    ensureMetaTagPresentWithProperty(
      'og:locale',
      'en',
    );
    ensureMetaTagPresentWithProperty(
      'og:site_name',
      metadata.siteName,
      'with site name from metadata',
    );
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
    // Honestly this should be probably a "name" meta tag but somehow @ngaox/seo uses property :/
    ensureMetaTagPresentWithProperty(
      'twitter:image:alt',
    )
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
    ensureMetaTagPresentWithName(
      'twitter:card',
    )
  })
  describe('Facebook', () => {
    ensureMetaTagPresentWithProperty(
      'fb:admins',
      metadata.nickname,
      'with nickname from metadata',
    )
    ensureMetaTagPresentWithName(
      'facebook-domain-verification',
    )
  });

  function ensureMetaTagPresent(bySelector: MetaDefinition, expectedContent?: jasmine.Expected<string>, expectedContentName?: string) {
    if (Object.keys(bySelector).length > 1) {
      throw new Error('Select a meta tag using 1 selector only')
    }
    const selectorAttribute = Object.keys(bySelector)[0];
    const selectorValue = bySelector[selectorAttribute];
    const selectorDescription = `with ${selectorAttribute} '${selectorValue}'`
    const expectedValueDescription = expectedContent ? (expectedContentName ?? `and value '${expectedContent}'`) : '';
    it(`should include meta tag ${selectorDescription} ${expectedValueDescription}`, () => {
      const metaElement = headElement.querySelector(`meta[${selectorAttribute}="${selectorValue}"]`)
      expect(metaElement).not.toBeNull()
      if (expectedContent) {
        expect(metaElement?.getAttribute('content')).toEqual(expectedContent);
      }
    })
  }

  function ensureMetaTagPresentWithName(name: string, expectedContent?: jasmine.Expected<string>, expectedContentName?: string) {
    ensureMetaTagPresent({name: name}, expectedContent, expectedContentName);
  }

  function ensureMetaTagPresentWithProperty(property: string, expectedContent?: jasmine.Expected<string>, expectedContentName?: string) {
    ensureMetaTagPresent({property: property}, expectedContent, expectedContentName);
  }
});
