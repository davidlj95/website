import { ComponentFixture } from '@angular/core/testing'
import { ExperienceSectionComponent } from './experience-section.component'
import { ExperienceComponent } from './experience/experience.component'
import { SectionTitleComponent } from '../section-title/section-title.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { MockComponents, MockProvider } from 'ng-mocks'
import { makeExperience } from '../../data/experience/__tests__/make-experience'
import { CardGridComponent } from '@/common/card-grid/card-grid.component'
import { By } from '@angular/platform-browser'
import { of } from 'rxjs'
import { GET_JSON_RESUME_EXPERIENCES } from '../../data/experience/get-json-resume-experiences'
import { Experience } from '../../data/experience/experience'

describe('ExperienceSectionComponent', () => {
  let component: ExperienceSectionComponent
  let fixture: ComponentFixture<ExperienceSectionComponent>

  it('should create', () => {
    ;[fixture, component] = makeSut()

    expect(component).toBeTruthy()
  })

  it('should display all experiences', () => {
    const experiences = [makeExperience(), makeExperience()]

    ;[fixture] = makeSut({ experiences })
    fixture.detectChanges()

    const experienceElements = fixture.debugElement.queryAll(
      By.directive(ExperienceComponent),
    )

    expect(experienceElements.length).toBe(experiences.length)
  })
})

function makeSut({
  experiences,
}: { experiences?: readonly Experience[] } = {}) {
  return componentTestSetup(ExperienceSectionComponent, {
    imports: [
      MockComponents(
        SectionTitleComponent,
        CardGridComponent,
        ExperienceComponent,
      ),
    ],
    providers: [
      MockProvider(GET_JSON_RESUME_EXPERIENCES, () => of(experiences ?? [])),
    ],
  })
}
