import { Component, inject, input } from '@angular/core'
import { ChippedContentComponent } from '@/common/chipped-content/chipped-content.component'
import { AttributeComponent } from '../../attribute/attribute.component'

import { CardHeaderAttributesComponent } from '@/common/card/card-header/card-header-attributes/card-header-attributes.component'
import { DateRangeComponent } from '../../../date-range/date-range.component'
import { CardHeaderDetailComponent } from '@/common/card/card-header/card-header-detail/card-header-detail.component'
import { CardHeaderTextsComponent } from '@/common/card/card-header/card-header-texts/card-header-texts.component'
import { CardHeaderImageComponent } from '@/common/card/card-header/card-header-image/card-header-image.component'
import { TestIdDirective } from '@/common/test-id.directive'
import { LinkComponent } from '../../../link/link.component'
import { CardHeaderComponent } from '@/common/card/card-header/card-header.component'
import { CardComponent } from '@/common/card/card.component'
import { EXPERIENCE_TO_CONTENTS } from './experience-to-contents'
import { TAG_TO_ATTRIBUTE } from './tags'
import { Experience } from '../../../data/experience'
import { toObservable, toSignal } from '@angular/core/rxjs-interop'
import { switchMap } from 'rxjs'

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
  private readonly _experienceToContents = inject(EXPERIENCE_TO_CONTENTS)

  protected readonly _contents = toSignal(
    toObservable(this.experience).pipe(
      switchMap((experience) => this._experienceToContents(experience)),
    ),
  )

  protected readonly _tagToAttribute = TAG_TO_ATTRIBUTE
}
