import { Component, Input } from '@angular/core'
import { EducationItem } from './education-item'
import { SocialLeaderboard } from '../../../material-symbols'
import { ChippedContent } from '../../chipped-content/chipped-content'
import { ChippedContentComponent } from '../../chipped-content/chipped-content.component'
import { AttributeComponent } from '../../attribute/attribute.component'
import { NgIf } from '@angular/common'
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
  standalone: true,
  imports: [
    CardComponent,
    CardHeaderComponent,
    LinkComponent,
    TestIdDirective,
    CardHeaderImageComponent,
    CardHeaderTextsComponent,
    CardHeaderTitleComponent,
    CardHeaderSubtitleComponent,
    CardHeaderDetailComponent,
    DateRangeComponent,
    CardHeaderAttributesComponent,
    NgIf,
    AttributeComponent,
    ChippedContentComponent,
  ],
})
export class EducationItemComponent {
  @Input({ required: true }) public set item(item: EducationItem) {
    this._item = item
    if (item.institution.name.length > 15 && item.institution.shortName) {
      this._institutionDisplayName = item.institution.shortName
    } else {
      this._institutionDisplayName = item.institution.name
    }
    this._contents = educationItemToContents(item)
  }

  protected _item!: EducationItem
  protected _contents: ReadonlyArray<ChippedContent> = []
  protected _institutionDisplayName?: string

  protected readonly MaterialSymbol = {
    SocialLeaderboard,
  }
  protected readonly Attribute = Attribute
}

export enum Attribute {
  CumLaude = 'cum-laude',
}
