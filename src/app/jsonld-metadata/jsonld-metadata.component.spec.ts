import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonldMetadataComponent } from './jsonld-metadata.component';

describe('JsonldMetadataComponent', () => {
  let component: JsonldMetadataComponent;
  let fixture: ComponentFixture<JsonldMetadataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JsonldMetadataComponent]
    });
    fixture = TestBed.createComponent(JsonldMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
