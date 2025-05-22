import { Component, computed, input } from '@angular/core'
import { ChippedContentComponent } from '@/common/chipped-content/chipped-content.component'

import { AttributesComponent } from '../../attributes/attributes.component'
import { DateRangeComponent } from '../../../date-range/date-range.component'
import { CardHeaderDetailComponent } from '@/common/card/card-header/card-header-detail/card-header-detail.component'
import { CardHeaderTextsComponent } from '@/common/card/card-header/card-header-texts/card-header-texts.component'
import { CardHeaderImageComponent } from '@/common/card/card-header/card-header-image/card-header-image.component'
import { TestIdDirective } from '@/common/test-id.directive'
import { LinkComponent } from '../../../link/link.component'
import { CardHeaderComponent } from '@/common/card/card-header/card-header.component'
import { CardComponent } from '@/common/card/card.component'
import { experienceToContents } from './experience-to-contents'
import { Experience } from '../../../data/experience/experience'

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
    AttributesComponent,
    ChippedContentComponent,
  ],
})
export class ExperienceComponent {
  readonly experience = input.required<Experience>()

  protected readonly _contents = computed(() =>
    experienceToContents(this.experience()),
  )
}
