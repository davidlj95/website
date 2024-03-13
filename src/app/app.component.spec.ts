import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { MockComponents } from 'ng-mocks'
import { ensureHasComponents } from '../test/helpers/component-testers'
import { ResumePageComponent } from './resume-page/resume-page.component'
import { AppComponent } from './app.component'
import { HeaderComponent } from './header/header.component'
import { NoScriptComponent } from './no-script/no-script.component'
import { ReleaseInfoComponent } from './release-info/release-info.component'
import { By } from '@angular/platform-browser'

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>
  let component: AppComponent

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MockComponents(
          ReleaseInfoComponent,
          NoScriptComponent,
          HeaderComponent,
          ResumePageComponent,
        ),
        AppComponent,
      ],
    })

    fixture = TestBed.createComponent(AppComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should include the router outlet component', () => {
    expect(fixture.debugElement.query(By.css('router-outlet'))).toBeTruthy()
  })

  ensureHasComponents(
    () => fixture,
    ReleaseInfoComponent,
    NoScriptComponent,
    HeaderComponent,
  )
})
