import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EducationItemCoursesComponent } from './education-item-courses.component'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { By } from '@angular/platform-browser'

describe('EducationItemCoursesComponent', () => {
  let component: EducationItemCoursesComponent
  let fixture: ComponentFixture<EducationItemCoursesComponent>
  const courses = ['Course 1', 'Course 2']

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EducationItemCoursesComponent],
      imports: [NoopAnimationsModule],
    })
    fixture = TestBed.createComponent(EducationItemCoursesComponent)
    component = fixture.componentInstance
    component.courses = courses
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display all courses', () => {
    const courseElements = fixture.debugElement.queryAll(By.css('li'))
    expect(courseElements.length).toEqual(courses.length)
    courseElements.forEach((courseElement, index) => {
      expect(courseElement.nativeElement.textContent.trim())
        .withContext(`course ${index}`)
        .toEqual(courses[index])
    })
  })
})
