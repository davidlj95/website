import { Component, Input } from '@angular/core'
import { ChipComponent } from '../../../chip/chip.component'
import { NgForOf } from '@angular/common'
import { TechnologyComponent } from '../../../technology/technology.component'
import { TechnologyItem } from '../../../technology/technology-item'
import { ContentChipListComponent } from '../../../content-chip-list/content-chip-list.component'
import { ContentChipComponent } from '../../../content-chip/content-chip.component'

@Component({
  selector: 'app-project-item-technologies',
  standalone: true,
  imports: [
    ChipComponent,
    NgForOf,
    TechnologyComponent,
    ContentChipListComponent,
    ContentChipComponent,
  ],
  templateUrl: './project-item-technologies.component.html',
})
export class ProjectItemTechnologiesComponent {
  @Input({ required: true }) public items!: ReadonlyArray<TechnologyItem>
}
