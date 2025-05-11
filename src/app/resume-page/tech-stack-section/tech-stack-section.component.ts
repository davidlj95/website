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
  CICD_TAG,
  CLOUD_TAG,
  DATABASE_TAG,
  FRAMEWORK_TAG,
  FRONTEND_TAG,
  INFRA_TAG,
  LANGUAGE_TAG,
  MONITORING_TAG,
  PACKAGING_TAG,
  PAYMENTS_TAG,
  PLATFORM_TAG,
  QUEUING_TAG,
  RUNTIME_TAG,
  TECH_TAGS,
  TECHS_BY_TAG,
  TECHS_TAGS,
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
  protected readonly _selectableTags = sort([
    ...REST_TAGS.filter((tag) =>
      // 👇 Techs using that tag have to be at least frontend, backend or infra.
      //    Otherwise, they won't ever appear anyway
      TECHS_BY_TAG[tag].some((tech) =>
        TECHS_TAGS[tech].some((techTag) => MAIN_TAGS.includes(techTag)),
      ),
    ),
  ])
  protected _selectedTags = signal<readonly TechTag[]>(DEFAULT_SELECTED_TAGS)
  protected readonly _techSelections = computed<readonly TechSelection[]>(() =>
    MAIN_TAGS.map((main) => ({
      main,
      include: this._selectedTags(),
      exclude: main === BACKEND_TAG ? [INFRA_TAG] : [],
    })),
  )
}

interface TechSelection {
  main: TechTag
  include: readonly TechTag[]
  exclude: readonly TechTag[]
}

const MAIN_TAGS: readonly TechTag[] = [BACKEND_TAG, FRONTEND_TAG, INFRA_TAG]
const REST_TAGS: readonly TechTag[] = TECH_TAGS.filter(
  (tag) => !MAIN_TAGS.includes(tag),
)
const sort = <T>(a: readonly T[]): readonly T[] => [...a].sort()
const DEFAULT_SELECTED_TAGS: readonly TechTag[] = [
  LANGUAGE_TAG,
  FRAMEWORK_TAG,
  CLOUD_TAG,
  CICD_TAG,
  MONITORING_TAG,
  QUEUING_TAG,
  PAYMENTS_TAG,
  RUNTIME_TAG,
  DATABASE_TAG,
  PLATFORM_TAG,
  PACKAGING_TAG,
]
