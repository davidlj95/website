import { Component } from '@angular/core'
import { ProjectItem } from './project-item/project-item'
import { ProjectItemsService } from './project-items.service'
import { ProjectItemComponent } from './project-item/project-item.component'
import { NgFor } from '@angular/common'
import { SectionTitleComponent } from '../section-title/section-title.component'
import { CardGridComponent } from '../card-grid/card-grid.component'

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

  constructor(projectItemsService: ProjectItemsService) {
    this.items = projectItemsService.get()
  }
}
