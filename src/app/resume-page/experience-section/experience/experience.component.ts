import { Component, computed, input } from '@angular/core'
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
import { experienceToContents } from './experience-to-contents'
import { TAG_TO_ATTRIBUTE } from './tags'
import { Experience } from '../../data/experience'

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
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
export class ExperienceComponent {
  readonly experience = input.required<Experience>()
  protected readonly _contents = computed(() =>
    experienceToContents(this.experience()),
  )

  protected readonly _tagToAttribute = TAG_TO_ATTRIBUTE
}
