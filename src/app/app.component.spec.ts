import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng-mocks';
import { ensureHasComponents } from '../../test/helpers';
import { AppComponent } from './app.component';
import { JsonldMetadataComponent } from './jsonld-metadata/jsonld-metadata.component';
import { WindowComponent } from './window/window.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        AppComponent,
        MockComponent(JsonldMetadataComponent),
        MockComponent(WindowComponent),
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  ensureHasComponents(() => fixture, JsonldMetadataComponent, WindowComponent)
});
