import {
  PLAIN,
  PLAIN_QUERY_PARAM,
  ResumePageComponent,
  WEB,
} from './resume-page.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { RouterTestingHarness } from '@angular/router/testing'
import { By } from '@angular/platform-browser'
import { WebResumeComponent } from './web-resume/web-resume.component'
import { ActivatedRoute, provideRouter } from '@angular/router'
import { PlainResumeComponent } from './plain-resume/plain-resume.component'
import { MockComponents } from 'ng-mocks'
import { ToolbarButtonComponent } from '../header/toolbar-button/toolbar-button.component'
import { ToolbarComponent } from '../header/toolbar/toolbar.component'
import { TestBed } from '@angular/core/testing'
import { SelectorComponent } from '../selector/selector.component'
import { tick } from '@/test/helpers/tick'

describe('ResumePageComponent', () => {
  it('should create', () => {
    const [fixture] = makeSut()

    expect(fixture.componentInstance).toBeTruthy()
  })

  it('should display web resume by default', async () => {
    const [fixture] = makeSut()
    await RouterTestingHarness.create('/')

    const webResume = fixture.debugElement.query(
      By.directive(WebResumeComponent),
    )

    expect(webResume).toBeTruthy()
  })

  it('should display plain resume when plain query param is present', async () => {
    const [fixture] = makeSut()
    await RouterTestingHarness.create(`/?${PLAIN_QUERY_PARAM}`)
    fixture.detectChanges()

    const plainResume = fixture.debugElement.query(
      By.directive(PlainResumeComponent),
    )

    expect(plainResume).toBeTruthy()
  })

  it('should navigate to plain version when selecting it', async () => {
    const [fixture] = makeSut()
    await RouterTestingHarness.create(`/`)

    fixture.componentInstance.onDisplayModeChange(PLAIN)
    await tick() // to navigate

    const route = TestBed.inject(ActivatedRoute)

    expect(route.snapshot.queryParamMap.has(PLAIN_QUERY_PARAM)).toBeTrue()
  })

  it('should navigate to web version when selecting it', async () => {
    const [fixture] = makeSut()
    await RouterTestingHarness.create(`/?${PLAIN_QUERY_PARAM}`)

    fixture.componentInstance.onDisplayModeChange(WEB)
    await tick() // to navigate

    const route = TestBed.inject(ActivatedRoute)

    expect(route.snapshot.queryParamMap.has(PLAIN_QUERY_PARAM)).toBeFalse()
  })
})

const makeSut = () => {
  const [fixture, component] = componentTestSetup(ResumePageComponent, {
    imports: [
      MockComponents(
        WebResumeComponent,
        PlainResumeComponent,
        SelectorComponent,
      ),
      ToolbarComponent,
      ToolbarButtonComponent,
    ],
    providers: [provideRouter([])],
  })
  fixture.detectChanges()
  return [fixture, component] as const
}
