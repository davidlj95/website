import { Component, computed, input } from '@angular/core'
import { Education } from '../../data/education'
import { SocialLeaderboard } from '@/data/material-symbols'
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
import { educationToContents } from './education-to-contents'

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  imports: [
    LinkComponent,
    TestIdDirective,
    CardComponent,
    CardHeaderComponent,
    CardHeaderImageComponent,
    CardHeaderTextsComponent,
    CardHeaderDetailComponent,
    CardHeaderAttributesComponent,
    DateRangeComponent,
    AttributeComponent,
    ChippedContentComponent,
  ],
})
export class EducationComponent {
  readonly education = input.required<Education>()
  protected readonly _contents = computed(() =>
    educationToContents(this.education()),
  )
  protected readonly _institutionDisplayName = computed<string>(() => {
    const { name, shortName } = this.education().institution
    return name.length > 15 && shortName ? shortName : name
  })

  protected readonly _materialSymbol = {
    SocialLeaderboard,
  }
  protected readonly _attribute = ATTRIBUTE
}

/** @visibleForTesting */
export const ATTRIBUTE = {
  CumLaude: 'cum-laude',
}
