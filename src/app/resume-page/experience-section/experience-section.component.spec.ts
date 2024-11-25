import { ComponentFixture } from '@angular/core/testing'
import { ExperienceSectionComponent } from './experience-section.component'
import { ExperienceItemComponent } from './experience-item/experience-item.component'
import { SectionTitleComponent } from '../section-title/section-title.component'
import { shouldContainComponent } from '@/test/helpers/component-testers'
import { byComponent } from '@/test/helpers/component-query-predicates'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { NgFor } from '@angular/common'
import { MockComponents, MockProvider } from 'ng-mocks'
import {
  GET_EXPERIENCE_ITEMS,
  GetExperienceItems,
} from './get-experience-items'
import { makeExperienceItem } from './experience-item/__tests__/make-experience-item'
import { CardGridComponent } from '../card-grid/card-grid.component'

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
      byComponent(ExperienceItemComponent),
    )

    expect(itemElements.length).toBe(experienceItems.length)
  })

  shouldContainComponent(() => makeSut()[0], SectionTitleComponent)
})

function makeSut(opts: { getExperienceItems?: GetExperienceItems } = {}) {
  return componentTestSetup(ExperienceSectionComponent, {
    imports: [
      ExperienceSectionComponent,
      NgFor,
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
