import { ComponentFixture } from '@angular/core/testing'
import { MockComponents } from 'ng-mocks'
import { shouldContainComponents } from '@/test/helpers/component-testers'
import { ResumePageComponent } from './resume-page/resume-page.component'
import { AppComponent } from './app.component'
import { HeaderComponent } from './header/header.component'
import { NoJsMessageComponent } from './no-js/no-js-message.component'
import { By } from '@angular/platform-browser'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { RouterOutlet } from '@angular/router'
import { BackgroundComponent } from './background/background.component'

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>
  let component: AppComponent

  beforeEach(() => {
    ;[fixture, component] = componentTestSetup(AppComponent, {
      imports: [
        AppComponent,
        MockComponents(
          BackgroundComponent,
          NoJsMessageComponent,
          HeaderComponent,
          ResumePageComponent,
        ),
        RouterOutlet,
      ],
    })
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should include the router outlet component', () => {
    expect(fixture.debugElement.query(By.css('router-outlet'))).toBeTruthy()
  })

  shouldContainComponents(() => fixture, HeaderComponent, NoJsMessageComponent)
})
