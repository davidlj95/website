import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core'
import { SectionTitleComponent } from '../section-title/section-title.component'
import { FilteredTechsComponent } from './filtered-techs/filtered-techs.component'
import {
  BACKEND_TAG,
  FRONTEND_TAG,
  INFRA_TAG,
  LANGUAGE_TAG,
  TagChar,
  TAGS,
  TechTag,
} from './tags'
import { TechTagsSelectorComponent } from './tech-tags-selector/tech-tags-selector.component'

@Component({
  selector: 'app-tech-stack-section',
  imports: [
    SectionTitleComponent,
    FilteredTechsComponent,
    TechTagsSelectorComponent,
  ],
  templateUrl: './tech-stack-section.component.html',
  styleUrl: './tech-stack-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechStackSectionComponent {
  protected readonly _selectableTags = [...REST_TAGS]
  protected _selectedTags = signal<readonly TechTag[]>([
    ...DEFAULT_SELECTED_TAGS,
  ])
  protected readonly _techSelections = computed<readonly TechSelection[]>(() =>
    MAIN_TAGS.map((main) => ({
      main,
      include: this._selectedTags().map((tag) => tag.char),
      exclude: main === BACKEND_TAG ? [INFRA_TAG.char] : [],
    })),
  )
}

interface TechSelection {
  main: TechTag
  include: readonly TagChar[]
  exclude: readonly TagChar[]
}

const MAIN_TAGS = [BACKEND_TAG, FRONTEND_TAG, INFRA_TAG]
const REST_TAGS = TAGS.filter((tag) => !MAIN_TAGS.includes(tag))
const DEFAULT_SELECTED_TAGS = [LANGUAGE_TAG]
