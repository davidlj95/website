import { DOCUMENT } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockProvider } from 'ng-mocks';

import { JsonldMetadataComponent } from './jsonld-metadata.component';

describe('JsonldMetadataComponent', () => {
  let component: JsonldMetadataComponent;
  let fixture: ComponentFixture<JsonldMetadataComponent>;
  let documentElement: HTMLElement;
  let fakeJsonLd: unknown = {'@context': 'https://schema.org', '@type': 'WebSite'}
  const scriptSelector = 'script[type="application/ld+json"]';

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JsonldMetadataComponent],
      providers: [
        MockProvider(JsonldMetadataComponent.JSON_LD_IT, fakeJsonLd, 'useValue'),
      ]
    });
    fixture = TestBed.createComponent(JsonldMetadataComponent);
    component = fixture.componentInstance;
    documentElement = TestBed.inject(DOCUMENT).documentElement;
    fixture.detectChanges();
  });
  afterEach(() => {
    documentElement.querySelector(scriptSelector)?.remove();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should append the JSON LD script to the document's head", () => {
    const script = documentElement.querySelector(scriptSelector);
    expect(script).toBeTruthy();
    expect(script!.innerHTML).toEqual(JSON.stringify(fakeJsonLd));
  });
});
