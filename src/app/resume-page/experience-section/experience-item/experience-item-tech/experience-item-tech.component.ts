import { Component, Input } from '@angular/core'
import { TechnologyItem } from '../../../technology/technology-item'
import { ContentChipComponent } from '../../../content-chip/content-chip.component'
import { ContentChipListComponent } from '../../../content-chip-list/content-chip-list.component'
import { NgForOf } from '@angular/common'
import { TechnologyComponent } from '../../../technology/technology.component'

@Component({
  selector: 'app-experience-item-tech',
  imports: [
    ContentChipComponent,
    ContentChipListComponent,
    NgForOf,
    TechnologyComponent,
  ],
  templateUrl: './experience-item-tech.component.html',
  styleUrl: './experience-item-tech.component.scss',
})
export class ExperienceItemTechComponent {
  @Input({ required: true }) public technologies!: readonly TechnologyItem[]
  @Input({ required: true }) public set projectNames(names: readonly string[]) {
    this._projectCount = names.length
    this._projectNames = new Intl.ListFormat('en').format(names)
  }
  protected _projectNames!: string
  protected _projectCount!: number
}
