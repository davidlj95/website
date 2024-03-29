import { Component } from '@angular/core'
import { ProjectsSectionComponent } from './projects-section/projects-section.component'
import { EducationSectionComponent } from './education-section/education-section.component'
import { ExperienceSectionComponent } from './experience-section/experience-section.component'
import { ProfileSectionComponent } from './profile-section/profile-section.component'

@Component({
  selector: 'app-resume-page',
  templateUrl: './resume-page.component.html',
  styleUrls: ['./resume-page.component.scss'],
  standalone: true,
  imports: [
    ProfileSectionComponent,
    ExperienceSectionComponent,
    EducationSectionComponent,
    ProjectsSectionComponent,
  ],
})
export class ResumePageComponent {
  constructor() {}
}
