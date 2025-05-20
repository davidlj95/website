import { Component, inject } from '@angular/core'
import { ProjectItemComponent } from './project-item/project-item.component'

import { SectionTitleComponent } from '../section-title/section-title.component'
import { CardGridComponent } from '../card-grid/card-grid.component'
import { GET_PROJECT_ITEMS } from '../data/get-project-items'
import { toSignal } from '@angular/core/rxjs-interop'

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'section[appProjects]',
  templateUrl: './projects-section.component.html',
  imports: [SectionTitleComponent, CardGridComponent, ProjectItemComponent],
})
export class ProjectsSectionComponent {
  protected readonly _projects = toSignal(inject(GET_PROJECT_ITEMS)())
}
