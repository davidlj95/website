import { ComponentFixture } from '@angular/core/testing'
import { ExperienceSectionComponent } from './experience-section.component'
import { ExperienceItemComponent } from './experience-item/experience-item.component'
import { SectionTitleComponent } from '../section-title/section-title.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { MockComponents, MockProvider } from 'ng-mocks'
import {
  GET_EXPERIENCE_ITEMS,
  GetExperienceItems,
} from './get-experience-items'
import { makeExperienceItem } from './experience-item/__tests__/make-experience-item'
import { CardGridComponent } from '../card-grid/card-grid.component'
import { By } from '@angular/platform-browser'

describe('ExperienceSectionComponent', () => {
  let component: ExperienceSectionComponent
  let fixture: ComponentFixture<ExperienceSectionComponent>

  it('should create', () => {
    ;[fixture, component] = makeSut()

    expect(component).toBeTruthy()
  })

  it('should display all experiences', () => {
    const experienceItems = [makeExperienceItem(), makeExperienceItem()]
    const getExperienceItems = jasmine
      .createSpy<GetExperienceItems>()
      .and.returnValue(experienceItems)

    ;[fixture, component] = makeSut({ getExperienceItems })
    fixture.detectChanges()

    const itemElements = fixture.debugElement.queryAll(
      By.directive(ExperienceItemComponent),
    )

    expect(itemElements.length).toBe(experienceItems.length)
  })
})

function makeSut(opts: { getExperienceItems?: GetExperienceItems } = {}) {
  return componentTestSetup(ExperienceSectionComponent, {
    imports: [
      ExperienceSectionComponent,
      MockComponents(
        SectionTitleComponent,
        ExperienceItemComponent,
        CardGridComponent,
      ),
    ],
    providers: [
      opts.getExperienceItems
        ? MockProvider(GET_EXPERIENCE_ITEMS, opts.getExperienceItems)
        : [],
    ],
  })
}
