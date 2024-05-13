import { Component, Input } from '@angular/core'
import { LanguageItem } from './language-item'
import { AttributeComponent } from '../../attribute/attribute.component'
import { CardComponent } from '../../card/card.component'
import { CardHeaderAttributesComponent } from '../../card/card-header/card-header-attributes/card-header-attributes.component'
import { CardHeaderComponent } from '../../card/card-header/card-header.component'
import { CardHeaderDetailComponent } from '../../card/card-header/card-header-detail/card-header-detail.component'
import { CardHeaderImageComponent } from '../../card/card-header/card-header-image/card-header-image.component'
import { CardHeaderSubtitleComponent } from '../../card/card-header/card-header-subtitle/card-header-subtitle.component'
import { CardHeaderTextsComponent } from '../../card/card-header/card-header-texts/card-header-texts.component'
import { CardHeaderTitleComponent } from '../../card/card-header/card-header-title/card-header-title.component'
import { ChippedContentComponent } from '../../chipped-content/chipped-content.component'
import { DateRangeComponent } from '../../date-range/date-range.component'
import { LinkComponent } from '../../link/link.component'
import { NgIf } from '@angular/common'
import { TestIdDirective } from '@/common/test-id.directive'
import { LanguageTagComponent } from './language-tag/language-tag.component'

@Component({
  selector: 'app-language-item',
  standalone: true,
  imports: [
    AttributeComponent,
    CardComponent,
    CardHeaderAttributesComponent,
    CardHeaderComponent,
    CardHeaderDetailComponent,
    CardHeaderImageComponent,
    CardHeaderSubtitleComponent,
    CardHeaderTextsComponent,
    CardHeaderTitleComponent,
    ChippedContentComponent,
    DateRangeComponent,
    LinkComponent,
    NgIf,
    TestIdDirective,
    LanguageTagComponent,
  ],
  templateUrl: './language-item.component.html',
})
export class LanguageItemComponent {
  @Input({ required: true }) item!: LanguageItem
}
