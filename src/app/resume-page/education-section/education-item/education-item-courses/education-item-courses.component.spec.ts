import { ComponentFixture } from '@angular/core/testing'

import { EducationItemCoursesComponent } from './education-item-courses.component'
import { byComponent } from '@test/helpers/component-query-predicates'
import { ContentChipComponent } from '../../../content-chip/content-chip.component'
import { componentTestSetup } from '@test/helpers/component-test-setup'

describe('EducationItemCoursesComponent', () => {
  let component: EducationItemCoursesComponent
  let fixture: ComponentFixture<EducationItemCoursesComponent>
  const COURSES = ['Course 1', 'Course 2']

  beforeEach(() => {
    ;[fixture, component] = componentTestSetup(EducationItemCoursesComponent)
    component.courses = COURSES
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should render all courses', () => {
    const courseElements = fixture.debugElement.queryAll(
      byComponent(ContentChipComponent),
    )
    expect(courseElements.length).toEqual(COURSES.length)
    courseElements.forEach((courseElement, index) => {
      expect(courseElement.nativeElement.textContent.trim()).toEqual(
        COURSES[index],
      )
    })
  })
})
