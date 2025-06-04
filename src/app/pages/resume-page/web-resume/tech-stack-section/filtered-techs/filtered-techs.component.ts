import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core'
import { ContentChipListComponent } from '@/common/content-chip-list/content-chip-list.component'
import { ContentChipComponent } from '@/common/content-chip/content-chip.component'
import { TechnologyComponent } from '../../../technology/technology.component'
import { getTechTagName, TechTag } from '../tags'
import { TECHS_SERVICE } from '../techs.service'

@Component({
  selector: 'app-filtered-techs',
  imports: [
    ContentChipListComponent,
    ContentChipComponent,
    TechnologyComponent,
  ],
  templateUrl: './filtered-techs.component.html',
  styleUrl: './filtered-techs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilteredTechsComponent {
  private readonly _techsService = inject(TECHS_SERVICE)
  protected readonly _getTechTagName = getTechTagName

  readonly tag = input.required<TechTag>()
  readonly includeTags = input<readonly TechTag[]>([])
  readonly excludeTags = input<readonly TechTag[]>([])
  protected readonly _techsForTag = computed<readonly string[]>(() =>
    this._techsService.findTechsByTag(this.tag(), {
      includes: this.includeTags(),
      excludes: this.excludeTags(),
    }),
  )
  protected readonly _topTechs = computed(() =>
    this._techsForTag().slice(0, TECH_LIMIT),
  )
  protected readonly _restOfTechsCount = computed(() =>
    Math.max(this._techsForTag().length - TECH_LIMIT, 0),
  )
}

const TECH_LIMIT = 10
