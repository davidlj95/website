import { Component, Input } from '@angular/core'
import { ExperienceItem } from './experience-item'
import { Badge, More, School, ToolsLadder, Work } from '@/data/material-symbols'
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
import { ChippedContent } from '../../chipped-content/chipped-content'
import { experienceItemToContents } from './experience-item-to-contents'

@Component({
  selector: 'app-experience-item',
  templateUrl: './experience-item.component.html',
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
export class ExperienceItemComponent {
  @Input({ required: true }) public set item(item: ExperienceItem) {
    this._item = item
    this._contents = experienceItemToContents(item)
  }

  protected _item!: ExperienceItem
  protected _contents: ReadonlyArray<ChippedContent> = []
  protected readonly MaterialSymbol = {
    Badge,
    Work,
    School,
    ToolsLadder,
    More,
  }
  protected readonly Attribute = Attribute
}

export enum Attribute {
  Freelance = 'freelance',
  Employee = 'employee',
  Internship = 'internship',
  MorePositions = 'more-positions',
  Promotions = 'promotions',
}
