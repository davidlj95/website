import { Component, HostBinding, Input } from '@angular/core'
import { ExperienceItem } from './experience-item'
import {
  Badge,
  More,
  School,
  ToolsLadder,
  Work,
} from '../../../material-symbols'
import { SlugGeneratorService } from '@common/slug-generator.service'
import { ExperienceItemSummaryComponent } from './experience-item-summary/experience-item-summary.component'
import { ExperienceItemHighlightsComponent } from './experience-item-highlights/experience-item-highlights.component'
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
import { TestIdDirective } from '@common/test-id.directive'
import { LinkComponent } from '../../link/link.component'
import { CardHeaderComponent } from '../../card/card-header/card-header.component'
import { CardComponent } from '../../card/card.component'
import { ChippedContent } from '../../chipped-content/chipped-content'
import { isNotUndefined } from '@common/is-not-undefined'

@Component({
  selector: 'app-experience-item',
  templateUrl: './experience-item.component.html',
  styleUrls: ['./experience-item.component.scss'],
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
    this.contents = [
      this._item.summary
        ? new ChippedContent({
            //id: ContentId.Summary,
            displayName: 'Summary',
            component: ExperienceItemSummaryComponent,
            inputs: {
              summary: this._item.summary,
            } satisfies Partial<ExperienceItemSummaryComponent>,
          })
        : undefined,
      this._item.highlights.length > 0
        ? new ChippedContent({
            //id: ContentId.Highlights,
            displayName: 'Highlights',
            component: ExperienceItemHighlightsComponent,
            inputs: {
              highlights: this._item.highlights,
            } satisfies Partial<ExperienceItemHighlightsComponent>,
          })
        : undefined,
    ].filter(isNotUndefined)
  }

  protected _item!: ExperienceItem
  public contents: ChippedContent[] = []
  protected readonly MaterialSymbol = {
    Badge,
    Work,
    School,
    ToolsLadder,
    More,
  }
  protected readonly Attribute = Attribute

  @HostBinding('style.grid-row')
  protected _gridRowStyle?: string

  constructor(private slugGenerator: SlugGeneratorService) {}

  public getAttributeId(attributeName: string) {
    return `${this.itemId}${attributeName}`
  }

  private get itemId() {
    return this.slugGenerator.generate(this._item.company.name, {
      prefix: 'exp-pos-',
    })
  }
}

export enum Attribute {
  Freelance = 'freelance',
  Employee = 'employee',
  Internship = 'internship',
  MorePositions = 'more-positions',
  Promotions = 'promotions',
}

export enum ContentId {
  Summary = 'summary',
  Highlights = 'highlights',
}
