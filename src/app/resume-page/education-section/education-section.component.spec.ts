import { ComponentFixture } from '@angular/core/testing'

import { EducationSectionComponent } from './education-section.component'
import { EducationItemComponent } from './education-item/education-item.component'
import { EDUCATION_SERVICE, EducationService } from '../data/education-service'
import { MockComponents, MockProvider } from 'ng-mocks'
import { SectionTitleComponent } from '../section-title/section-title.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { makeEducation } from '../data/__tests__/make-education'
import { CardGridComponent } from '../card-grid/card-grid.component'
import { By } from '@angular/platform-browser'
import { of } from 'rxjs'

describe('EducationSectionComponent', () => {
  let component: EducationSectionComponent
  let fixture: ComponentFixture<EducationSectionComponent>

  it('should create', () => {
    ;[fixture, component] = makeSut()

    expect(component).toBeTruthy()
  })

  it('should display all educations', () => {
    const educations = [makeEducation(), makeEducation()]
    const educationService = jasmine
      .createSpy<EducationService>()
      .and.returnValue(of(educations))

    ;[fixture, component] = makeSut({ educationService })
    fixture.detectChanges()

    const educationElements = fixture.debugElement.queryAll(
      By.directive(EducationItemComponent),
    )

    expect(educationElements.length).toBe(educations.length)
  })
})

function makeSut({
  educationService,
}: { educationService?: EducationService } = {}) {
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
      educationService ? MockProvider(EDUCATION_SERVICE, educationService) : [],
    ],
  })
}
