import { Component, computed, input } from '@angular/core'
import { EducationItem } from './education-item'
import { SocialLeaderboard } from '@/data/material-symbols'
import { ChippedContentComponent } from '../../chipped-content/chipped-content.component'
import { AttributeComponent } from '../../attribute/attribute.component'

import { CardHeaderAttributesComponent } from '../../card/card-header/card-header-attributes/card-header-attributes.component'
import { DateRangeComponent } from '../../date-range/date-range.component'
import { CardHeaderDetailComponent } from '../../card/card-header/card-header-detail/card-header-detail.component'
import { CardHeaderSubtitleComponent } from '../../card/card-header/card-header-subtitle/card-header-subtitle.component'
import { CardHeaderTitleComponent } from '../../card/card-header/card-header-title/card-header-title.component'
import { CardHeaderTextsComponent } from '../../card/card-header/card-header-texts/card-header-texts.component'
import { CardHeaderImageComponent } from '../../card/card-header/card-header-image/card-header-image.component'
import { TestIdDirective } from '@/common/test-id.directive'
import { LinkComponent } from '../../link/link.component'
import { CardHeaderComponent } from '../../card/card-header/card-header.component'
import { CardComponent } from '../../card/card.component'
import { educationItemToContents } from './education-item-to-contents'

@Component({
  selector: 'app-education-item',
  templateUrl: './education-item.component.html',
  imports: [
    LinkComponent,
    TestIdDirective,
    CardComponent,
    CardHeaderComponent,
    CardHeaderImageComponent,
    CardHeaderTextsComponent,
    CardHeaderTitleComponent,
    CardHeaderSubtitleComponent,
    CardHeaderDetailComponent,
    CardHeaderAttributesComponent,
    DateRangeComponent,
    AttributeComponent,
    ChippedContentComponent,
  ],
})
export class EducationItemComponent {
  readonly item = input.required<EducationItem>()
  protected readonly _contents = computed(() =>
    educationItemToContents(this.item()),
  )
  protected readonly _institutionDisplayName = computed<string>(() => {
    const { name, shortName } = this.item().institution
    return name.length > 15 && shortName ? shortName : name
  })

  protected readonly _materialSymbol = {
    SocialLeaderboard,
  }
  protected readonly _attribute = ATTRIBUTE
}

// @visibleForTesting
export const ATTRIBUTE = {
  CumLaude: 'cum-laude',
}
