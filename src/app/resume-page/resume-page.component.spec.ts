import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MockComponents } from 'ng-mocks'
import { shouldContainComponents } from '@test/helpers/component-testers'

import { ResumePageComponent } from './resume-page.component'
import { ProfileSectionComponent } from './profile-section/profile-section.component'
import { ExperienceSectionComponent } from './experience-section/experience-section.component'
import { EducationSectionComponent } from './education-section/education-section.component'
import { ProjectsSectionComponent } from './projects-section/projects-section.component'

describe('ResumePageComponent', () => {
  let component: ResumePageComponent
  let fixture: ComponentFixture<ResumePageComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ResumePageComponent,
        MockComponents(
          ProfileSectionComponent,
          ExperienceSectionComponent,
          EducationSectionComponent,
          ProjectsSectionComponent,
        ),
      ],
    })
    fixture = TestBed.createComponent(ResumePageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  shouldContainComponents(
    () => fixture,
    ProfileSectionComponent,
    ExperienceSectionComponent,
    //EducationSectionComponent,
    //ProjectsSectionComponent,
  )
})
