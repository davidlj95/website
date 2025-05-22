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
import { MockComponents, MockProvider } from 'ng-mocks'
import { ToolbarButtonComponent } from '@/common/toolbar-button/toolbar-button.component'
import { ToolbarComponent } from '@/common/toolbar/toolbar.component'
import { TestBed } from '@angular/core/testing'
import { SelectorComponent } from '@/common/selector/selector.component'
import { tick } from '@/test/helpers/tick'
import {
  RESUME_CONFIG_SERVICE,
  ResumeConfigService,
} from './data/resume-config.service'
import { CheckboxComponent } from '@/common/checkbox/checkbox.component'
import { CheckboxLabelComponent } from '@/common/checkbox-label/checkbox-label.component'
import { firstValueFrom, of } from 'rxjs'
import { NgIcon } from '@ng-icons/core'

describe('ResumePageComponent', () => {
  it('should create', () => {
    const [fixture] = makeSut()

    expect(fixture.componentInstance).toBeTruthy()
  })

  it('should display web resume and unset compact mode by default', async () => {
    const [fixture] = makeSut()
    await RouterTestingHarness.create('/')

    const webResume = fixture.debugElement.query(
      By.directive(WebResumeComponent),
    )

    expect(webResume).toBeTruthy()
    expect(
      await firstValueFrom(TestBed.inject(RESUME_CONFIG_SERVICE).compact$),
    ).toBeFalse()
  })

  it('should display plain resume and set compact mode when plain query param is present', async () => {
    const [fixture] = makeSut()
    await RouterTestingHarness.create(`/?${PLAIN_QUERY_PARAM}`)
    fixture.detectChanges()

    const plainResume = fixture.debugElement.query(
      By.directive(PlainResumeComponent),
    )

    expect(plainResume).toBeTruthy()

    expect(
      await firstValueFrom(TestBed.inject(RESUME_CONFIG_SERVICE).compact$),
    ).toBeTrue()
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

  it('should set compact mode when checking it', () => {
    const isCompact = true
    const setCompact = jasmine.createSpy<ResumeConfigService['setCompact']>()
    const [fixture] = makeSut({
      resumeConfigService: { compact$: of(false), setCompact },
    })

    fixture.componentInstance.onCompactModeChange({
      target: { checked: isCompact } as HTMLInputElement,
    } satisfies Partial<Event> as unknown as Event)

    expect(setCompact).toHaveBeenCalledWith(isCompact)
  })
})

const makeSut = ({
  resumeConfigService,
}: { resumeConfigService?: Partial<ResumeConfigService> } = {}) => {
  const [fixture, component] = componentTestSetup(ResumePageComponent, {
    imports: [
      MockComponents(
        WebResumeComponent,
        PlainResumeComponent,
        SelectorComponent,
        CheckboxComponent,
        CheckboxLabelComponent,
        NgIcon,
      ),
      ToolbarComponent,
      ToolbarButtonComponent,
    ],
    providers: [
      provideRouter([]),
      resumeConfigService
        ? MockProvider(RESUME_CONFIG_SERVICE, resumeConfigService)
        : [],
    ],
  })
  fixture.detectChanges()
  return [fixture, component] as const
}
