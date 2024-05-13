import { Component, Inject } from '@angular/core'
import { ProjectItem } from './project-item/project-item'
import { ProjectItemComponent } from './project-item/project-item.component'
import { NgFor } from '@angular/common'
import { SectionTitleComponent } from '../section-title/section-title.component'
import { CardGridComponent } from '../card-grid/card-grid.component'
import { GET_PROJECT_ITEMS, GetProjectItems } from './get-project-items'

@Component({
  selector: 'app-projects-section',
  templateUrl: './projects-section.component.html',
  standalone: true,
  imports: [
    SectionTitleComponent,
    CardGridComponent,
    NgFor,
    ProjectItemComponent,
  ],
})
export class ProjectsSectionComponent {
  public readonly items: ReadonlyArray<ProjectItem>

  constructor(@Inject(GET_PROJECT_ITEMS) getProjectItems: GetProjectItems) {
    this.items = getProjectItems()
  }
}
