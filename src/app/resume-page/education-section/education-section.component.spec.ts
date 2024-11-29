import { ComponentFixture } from '@angular/core/testing'

import { EducationSectionComponent } from './education-section.component'
import { EducationItemComponent } from './education-item/education-item.component'
import { GET_EDUCATION_ITEMS, GetEducationItems } from './get-education-items'
import { MockComponents, MockProvider } from 'ng-mocks'
import { SectionTitleComponent } from '../section-title/section-title.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { makeEducationItem } from './education-item/__tests__/make-education-item'
import { CardGridComponent } from '../card-grid/card-grid.component'
import { By } from '@angular/platform-browser'

describe('EducationSectionComponent', () => {
  let component: EducationSectionComponent
  let fixture: ComponentFixture<EducationSectionComponent>

  it('should create', () => {
    ;[fixture, component] = makeSut()

    expect(component).toBeTruthy()
  })

  it('should display all educations', () => {
    const educationItems = [makeEducationItem(), makeEducationItem()]
    const getEducationItems = jasmine
      .createSpy<GetEducationItems>()
      .and.returnValue(educationItems)

    ;[fixture, component] = makeSut({ getEducationItems })
    fixture.detectChanges()

    const itemElements = fixture.debugElement.queryAll(
      By.directive(EducationItemComponent),
    )

    expect(itemElements.length).toBe(educationItems.length)
  })
})

function makeSut(opts: { getEducationItems?: GetEducationItems } = {}) {
  return componentTestSetup(EducationSectionComponent, {
    imports: [
      EducationSectionComponent,
      MockComponents(
        SectionTitleComponent,
        EducationItemComponent,
        CardGridComponent,
      ),
    ],
    providers: [
      opts.getEducationItems
        ? MockProvider(GET_EDUCATION_ITEMS, opts.getEducationItems)
        : [],
    ],
  })
}
