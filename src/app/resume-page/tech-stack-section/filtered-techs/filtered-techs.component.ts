import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core'
import { ContentChipListComponent } from '../../content-chip-list/content-chip-list.component'
import { ContentChipComponent } from '../../content-chip/content-chip.component'
import { TechnologyComponent } from '../../technology/technology.component'
import { FIND_TECHS_BY_TAG, TagChar, TechTag } from '../tags'

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
  private readonly _findTechsByTag = inject(FIND_TECHS_BY_TAG)

  readonly tag = input.required<TechTag>()
  readonly excludeTags = input<readonly TagChar[]>([])
  protected readonly _techsForTag = computed<readonly string[]>(() =>
    this._findTechsByTag(this.tag().char, { excludes: this.excludeTags() }),
  )
  protected readonly _topTechs = computed(() =>
    this._techsForTag().slice(0, TECH_LIMIT),
  )
  protected readonly _restOfTechsCount = computed(
    () => this._techsForTag().length - TECH_LIMIT,
  )
}

const TECH_LIMIT = 10
