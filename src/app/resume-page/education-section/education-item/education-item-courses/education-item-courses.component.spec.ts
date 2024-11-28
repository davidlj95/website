import { ComponentFixture } from '@angular/core/testing'

import { EducationItemCoursesComponent } from './education-item-courses.component'
import { byComponent } from '@/test/helpers/component-query-predicates'
import { ContentChipComponent } from '../../../content-chip/content-chip.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { textContent } from '@/test/helpers/text-content'
import { setFixtureInputsAndDetectChanges } from '@/test/helpers/set-fixture-inputs'

describe('EducationItemCoursesComponent', () => {
  let component: EducationItemCoursesComponent
  let fixture: ComponentFixture<EducationItemCoursesComponent>
  const DUMMY_COURSES = ['Course 1', 'Course 2']

  beforeEach(() => {
    ;[fixture, component] = componentTestSetup(EducationItemCoursesComponent)
    setFixtureInputsAndDetectChanges(fixture, { courses: DUMMY_COURSES })
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should render all courses', () => {
    const courseElements = fixture.debugElement.queryAll(
      byComponent(ContentChipComponent),
    )

    expect(courseElements.length).toEqual(DUMMY_COURSES.length)
    courseElements.forEach((courseElement, index) => {
      expect(textContent(courseElement)).toEqual(DUMMY_COURSES[index])
    })
  })
})
