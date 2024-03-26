import { Component, Input } from '@angular/core'
import { ChipComponent } from '../../../chip/chip.component'
import { NgForOf } from '@angular/common'
import { Technology } from '../project-item'
import { TechnologyComponent } from '../../../technology/technology.component'
import { TechnologyService } from '../../../technology/technology.service'
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
  styleUrl: './project-item-technologies.component.scss',
})
export class ProjectItemTechnologiesComponent {
  @Input({ required: true })
  public set technologies(technologies: ReadonlyArray<Technology>) {
    this.items = technologies.map((technology) => ({
      displayName:
        this._technologyService.getDisplayName(technology.id) ?? technology.id,
      icon: this._technologyService.getIcon(technology.id) ?? undefined,
      slug: technology.id,
      version: technology.version,
    }))
  }

  /**
   * @visibleForTesting
   */
  public items: ReadonlyArray<TechnologyItem> = []

  constructor(private readonly _technologyService: TechnologyService) {}
}
