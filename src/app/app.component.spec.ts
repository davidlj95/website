import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponents } from 'ng-mocks';
import { ensureHasComponents } from '../test/helpers/component-testers';
import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { JsonldMetadataComponent } from './jsonld-metadata/jsonld-metadata.component';
import { NoScriptComponent } from './no-script/no-script.component';
import { ReleaseInfoComponent } from './release-info/release-info.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        AppComponent,
        MockComponents(
          JsonldMetadataComponent,
          ReleaseInfoComponent,
          NoScriptComponent,
          HeaderComponent,
          AboutComponent,
        ),
      ],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  ensureHasComponents(() => fixture,
    JsonldMetadataComponent, ReleaseInfoComponent,
    NoScriptComponent, HeaderComponent, AboutComponent,
  )
});
