import { ComponentFixture } from '@angular/core/testing'

import { WebResumeComponent } from './web-resume.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { MockComponents } from 'ng-mocks'
import { TechStackSectionComponent } from './tech-stack-section/tech-stack-section.component'
import { ExperienceSectionComponent } from './experience-section/experience-section.component'
import { EducationSectionComponent } from './education-section/education-section.component'
import { ProjectsSectionComponent } from './projects-section/projects-section.component'
import { LanguagesSectionComponent } from './languages-section/languages-section.component'

describe('WebResumeComponent', () => {
  let component: WebResumeComponent
  let fixture: ComponentFixture<WebResumeComponent>

  beforeEach(() => {
    ;[fixture, component] = componentTestSetup(WebResumeComponent, {
      imports: [
        MockComponents(
          TechStackSectionComponent,
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
})
