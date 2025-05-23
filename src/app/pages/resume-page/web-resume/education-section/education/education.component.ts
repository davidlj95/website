import { Component, computed, input } from '@angular/core'
import { Education } from '../../../data/education/education'
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
    AttributesComponent,
    DateRangeComponent,
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
}
