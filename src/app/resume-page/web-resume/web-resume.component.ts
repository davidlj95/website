import { ChangeDetectionStrategy, Component } from '@angular/core'
import { EducationSectionComponent } from '../education-section/education-section.component'
import { ExperienceSectionComponent } from '../experience-section/experience-section.component'
import { LanguagesSectionComponent } from '../languages-section/languages-section.component'
import { ProfileSectionComponent } from '../profile-section/profile-section.component'
import { ProjectsSectionComponent } from '../projects-section/projects-section.component'
import { TechStackSectionComponent } from '../tech-stack-section/tech-stack-section.component'

@Component({
  selector: 'app-web-resume',
  imports: [
    EducationSectionComponent,
    ExperienceSectionComponent,
    LanguagesSectionComponent,
    ProfileSectionComponent,
    ProjectsSectionComponent,
    TechStackSectionComponent,
  ],
  templateUrl: './web-resume.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebResumeComponent {}
