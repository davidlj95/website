import { ComponentFixture } from '@angular/core/testing'

import { EducationCoursesComponent } from './education-courses.component'
import { ContentChipComponent } from '@/common/content-chip/content-chip.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { textContent } from '@/test/helpers/text-content'
import { setFixtureInputsAndDetectChanges } from '@/test/helpers/set-fixture-inputs'
import { By } from '@angular/platform-browser'

describe('EducationCoursesComponent', () => {
  let component: EducationCoursesComponent
  let fixture: ComponentFixture<EducationCoursesComponent>
  const DUMMY_COURSES = ['Course 1', 'Course 2']

  beforeEach(() => {
    ;[fixture, component] = componentTestSetup(EducationCoursesComponent)
    setFixtureInputsAndDetectChanges(fixture, { courses: DUMMY_COURSES })
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should render all courses', () => {
    const courseElements = fixture.debugElement.queryAll(
      By.directive(ContentChipComponent),
    )

    expect(courseElements.length).toEqual(DUMMY_COURSES.length)
    courseElements.forEach((courseElement, index) => {
      expect(textContent(courseElement)).toEqual(DUMMY_COURSES[index])
    })
  })
})
