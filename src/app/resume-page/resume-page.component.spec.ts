import { ComponentFixture } from '@angular/core/testing'
import { MockComponents } from 'ng-mocks'
import { shouldContainComponents } from '@/test/helpers/component-testers'

import { ResumePageComponent } from './resume-page.component'
import { ProfileSectionComponent } from './profile-section/profile-section.component'
import { ExperienceSectionComponent } from './experience-section/experience-section.component'
import { EducationSectionComponent } from './education-section/education-section.component'
import { ProjectsSectionComponent } from './projects-section/projects-section.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { LanguagesSectionComponent } from './languages-section/languages-section.component'

describe('ResumePageComponent', () => {
  let component: ResumePageComponent
  let fixture: ComponentFixture<ResumePageComponent>

  beforeEach(() => {
    ;[fixture, component] = componentTestSetup(ResumePageComponent, {
      imports: [
        ResumePageComponent,
        MockComponents(
          ProfileSectionComponent,
          ExperienceSectionComponent,
          EducationSectionComponent,
          ProjectsSectionComponent,
          LanguagesSectionComponent,
        ),
      ],
    })
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  shouldContainComponents(
    () => fixture,
    ProfileSectionComponent,
    ExperienceSectionComponent,
    EducationSectionComponent,
    ProjectsSectionComponent,
  )
})
