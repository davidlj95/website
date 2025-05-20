import { Component, Inject } from '@angular/core'
import { Project } from '../data/project'
import { ProjectItemComponent } from './project-item/project-item.component'

import { SectionTitleComponent } from '../section-title/section-title.component'
import { CardGridComponent } from '../card-grid/card-grid.component'
import { GET_PROJECT_ITEMS, GetProjectItems } from './get-project-items'

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'section[appProjects]',
  templateUrl: './projects-section.component.html',
  imports: [SectionTitleComponent, CardGridComponent, ProjectItemComponent],
})
export class ProjectsSectionComponent {
  protected readonly _items: readonly Project[]

  constructor(@Inject(GET_PROJECT_ITEMS) getProjectItems: GetProjectItems) {
    this._items = getProjectItems()
  }
}
