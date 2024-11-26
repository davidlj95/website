import { Component, Input, input } from '@angular/core'
import { TechnologyItem } from '../../../technology/technology-item'
import { ContentChipComponent } from '../../../content-chip/content-chip.component'
import { ContentChipListComponent } from '../../../content-chip-list/content-chip-list.component'

import { TechnologyComponent } from '../../../technology/technology.component'

@Component({
  selector: 'app-experience-item-tech',
  imports: [
    ContentChipComponent,
    ContentChipListComponent,
    TechnologyComponent,
  ],
  templateUrl: './experience-item-tech.component.html',
  styleUrl: './experience-item-tech.component.scss',
})
export class ExperienceItemTechComponent {
  public readonly technologies = input.required<readonly TechnologyItem[]>()
  // TODO: Skipped for migration because:
  //  Accessor inputs cannot be migrated as they are too complex.
  @Input({ required: true }) public set projectNames(names: readonly string[]) {
    this._projectCount = names.length
    this._projectNames = new Intl.ListFormat('en').format(names)
  }
  protected _projectNames!: string
  protected _projectCount!: number
}
