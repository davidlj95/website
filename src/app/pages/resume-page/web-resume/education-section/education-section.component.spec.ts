import { ComponentFixture } from '@angular/core/testing'

import { EducationSectionComponent } from './education-section.component'
import { EducationComponent } from './education/education.component'
import { MockComponents, MockProvider } from 'ng-mocks'
import { SectionTitleComponent } from '../section-title/section-title.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { makeEducation } from '../../data/education/__tests__/make-education'
import { CardGridComponent } from '@/common/card-grid/card-grid.component'
import { By } from '@angular/platform-browser'
import { of } from 'rxjs'
import { Education } from '../../data/education/education'
import { EDUCATION_SERVICE } from '../../data/education/education-service'

describe('EducationSectionComponent', () => {
  let component: EducationSectionComponent
  let fixture: ComponentFixture<EducationSectionComponent>

  it('should create', () => {
    ;[fixture, component] = makeSut()

    expect(component).toBeTruthy()
  })

  it('should display all educations', () => {
    const educations = [makeEducation(), makeEducation()]

    ;[fixture] = makeSut({ educations })
    fixture.detectChanges()

    const educationElements = fixture.debugElement.queryAll(
      By.directive(EducationComponent),
    )

    expect(educationElements.length).toBe(educations.length)
  })
})

function makeSut({ educations }: { educations?: readonly Education[] } = {}) {
  return componentTestSetup(EducationSectionComponent, {
    imports: [
      MockComponents(
        SectionTitleComponent,
        CardGridComponent,
        EducationComponent,
      ),
    ],
    providers: [
      MockProvider(EDUCATION_SERVICE, { getAll: () => of(educations ?? []) }),
    ],
  })
}
