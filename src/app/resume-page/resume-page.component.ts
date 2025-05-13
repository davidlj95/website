import { Component } from '@angular/core'
import { ExperienceSectionComponent } from './experience-section/experience-section.component'
import { ProfileSectionComponent } from './profile-section/profile-section.component'
import { EducationSectionComponent } from './education-section/education-section.component'
import { ProjectsSectionComponent } from './projects-section/projects-section.component'
import { LanguagesSectionComponent } from './languages-section/languages-section.component'
import { TechStackSectionComponent } from './tech-stack-section/tech-stack-section.component'

@Component({
  templateUrl: './resume-page.component.html',
  imports: [
    ProfileSectionComponent,
    ExperienceSectionComponent,
    EducationSectionComponent,
    ProjectsSectionComponent,
    LanguagesSectionComponent,
    TechStackSectionComponent,
  ],
})
export class ResumePageComponent {}
