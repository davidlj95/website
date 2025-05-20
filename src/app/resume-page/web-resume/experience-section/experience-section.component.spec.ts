import { ComponentFixture } from '@angular/core/testing'
import { ExperienceSectionComponent } from './experience-section.component'
import { ExperienceComponent } from './experience/experience.component'
import { SectionTitleComponent } from '../section-title/section-title.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { MockComponents, MockProvider } from 'ng-mocks'
import { makeExperience } from '../../data/__tests__/make-experience'
import { CardGridComponent } from '@/common/card-grid/card-grid.component'
import { By } from '@angular/platform-browser'
import {
  EXPERIENCE_SERVICE,
  ExperienceService,
} from '../../data/experience-service'
import { of } from 'rxjs'

describe('ExperienceSectionComponent', () => {
  let component: ExperienceSectionComponent
  let fixture: ComponentFixture<ExperienceSectionComponent>

  it('should create', () => {
    ;[fixture, component] = makeSut()

    expect(component).toBeTruthy()
  })

  it('should display all experiences', () => {
    const experiences = [makeExperience(), makeExperience()]
    const experienceService: ExperienceService = {
      getAll: jasmine
        .createSpy<ExperienceService['getAll']>()
        .and.returnValue(of(experiences)),
    }

    ;[fixture, component] = makeSut({ experienceService })
    fixture.detectChanges()

    const experienceElements = fixture.debugElement.queryAll(
      By.directive(ExperienceComponent),
    )

    expect(experienceElements.length).toBe(experiences.length)
  })
})

function makeSut({
  experienceService,
}: { experienceService?: ExperienceService } = {}) {
  return componentTestSetup(ExperienceSectionComponent, {
    imports: [
      ExperienceSectionComponent,
      MockComponents(
        SectionTitleComponent,
        ExperienceComponent,
        CardGridComponent,
      ),
    ],
    providers: [
      experienceService
        ? MockProvider(EXPERIENCE_SERVICE, experienceService)
        : [],
    ],
  })
}
