import { Component } from '@angular/core'
import { ProjectItem } from './project-item/project-item'
import { ProjectItemsService } from './project-items.service'

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  public readonly items: ReadonlyArray<ProjectItem>

  constructor(projectItemsService: ProjectItemsService) {
    this.items = projectItemsService.get()
  }
}
