import { Component } from '@angular/core'
import { ProjectItem } from './project-item/project-item'
import { ProjectItemsService } from './project-items.service'

@Component({
  selector: 'app-projects-section',
  templateUrl: './projects-section.component.html',
  styleUrls: ['./projects-section.component.scss'],
})
export class ProjectsSectionComponent {
  public readonly items: ReadonlyArray<ProjectItem>

  constructor(projectItemsService: ProjectItemsService) {
    this.items = projectItemsService.get()
  }
}
