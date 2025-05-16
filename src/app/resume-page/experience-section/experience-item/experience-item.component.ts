import { Component, computed, input } from '@angular/core'
import { ExperienceItem } from './experience-item'
import { Badge, More, School, ToolsLadder, Work } from '@/data/material-symbols'
import { ChippedContentComponent } from '../../chipped-content/chipped-content.component'
import { AttributeComponent } from '../../attribute/attribute.component'

import { CardHeaderAttributesComponent } from '../../card/card-header/card-header-attributes/card-header-attributes.component'
import { DateRangeComponent } from '../../date-range/date-range.component'
import { CardHeaderDetailComponent } from '../../card/card-header/card-header-detail/card-header-detail.component'
import { CardHeaderTextsComponent } from '../../card/card-header/card-header-texts/card-header-texts.component'
import { CardHeaderImageComponent } from '../../card/card-header/card-header-image/card-header-image.component'
import { TestIdDirective } from '@/common/test-id.directive'
import { LinkComponent } from '../../link/link.component'
import { CardHeaderComponent } from '../../card/card-header/card-header.component'
import { CardComponent } from '../../card/card.component'
import { experienceItemToContents } from './experience-item-to-contents'
import { TAG_TO_ATTRIBUTE } from '../tags'

@Component({
  selector: 'app-experience-item',
  templateUrl: './experience-item.component.html',
  imports: [
    LinkComponent,
    TestIdDirective,
    CardComponent,
    CardHeaderComponent,
    CardHeaderImageComponent,
    CardHeaderTextsComponent,
    CardHeaderDetailComponent,
    DateRangeComponent,
    CardHeaderAttributesComponent,
    AttributeComponent,
    ChippedContentComponent,
  ],
})
export class ExperienceItemComponent {
  readonly item = input.required<ExperienceItem>()
  protected readonly _contents = computed(() =>
    experienceItemToContents(this.item()),
  )

  protected readonly _materialSymbol = {
    Badge,
    Work,
    School,
    ToolsLadder,
    More,
  }
  protected readonly _attribute = ATTRIBUTE
  protected readonly _tagToAttribute = TAG_TO_ATTRIBUTE
}

/** @visibleForTesting */
export const ATTRIBUTE = {
  Freelance: 'freelance',
  Employee: 'employee',
  Internship: 'internship',
  MorePositions: 'more-positions',
  Promotions: 'promotions',
} as const
