import { DOCUMENT } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockProvider } from 'ng-mocks';
import { Environment } from '../../environments';
import { ENVIRONMENT, METADATA } from '../common/injection-tokens';
import { Metadata } from '../metadata';

import { JsonldMetadataComponent } from './jsonld-metadata.component';

describe('JsonldMetadataComponent', () => {
  let component: JsonldMetadataComponent;
  let fixture: ComponentFixture<JsonldMetadataComponent>;
  let headElement: HTMLHeadElement;
  const fakeMetadata: Metadata = {
    realName: 'Foo',
    authorUrl: new URL('https://example.com/foo'),
    siteName: 'Foo | @foo',
    description: 'Foobar lorem ipsum',
  } as Pick<Metadata, 'realName' | 'authorUrl' | 'siteName' | 'description'> as Metadata;
  const fakeEnvironment: Environment = {
    canonicalUrl: new URL('https://example.com/canonical'),
  } as Pick<Environment, 'canonicalUrl'> as Environment;
  const scriptSelector = 'script[type="application/ld+json"]'

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JsonldMetadataComponent],
      providers: [
        MockProvider(METADATA, fakeMetadata),
        MockProvider(ENVIRONMENT, fakeEnvironment),
      ]
    });
    fixture = TestBed.createComponent(JsonldMetadataComponent);
    component = fixture.componentInstance;
    headElement = TestBed.inject(DOCUMENT).head;
    fixture.detectChanges();
  });
  afterEach(() => {
    headElement.querySelector(scriptSelector)?.remove();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the JSON LD using metadata and environment', () => {
    const jsonLd = component.jsonLd;
    expect(jsonLd['@context']).toEqual('https://schema.org')
    expect(jsonLd['@type']).toEqual('WebSite')
    expect(jsonLd['author']['@type']).toEqual('Person')
    expect(jsonLd['author']['name']).toEqual(fakeMetadata.realName)
    expect(jsonLd['author']['url']).toEqual(fakeMetadata.authorUrl)
    expect(jsonLd['name']).toEqual(fakeMetadata.siteName)
    expect(jsonLd['headline']).toEqual(fakeMetadata.description)
    expect(jsonLd['url']).toEqual(fakeEnvironment.canonicalUrl)
  })

  it("should append the JSON LD script to the document's head", () => {
    const script = headElement.querySelector(scriptSelector);
    expect(script).toBeTruthy();
    expect(script!.innerHTML).toEqual(JSON.stringify(component.jsonLd));
  });
});
