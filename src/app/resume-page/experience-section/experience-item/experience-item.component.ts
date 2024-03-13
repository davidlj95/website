import { Component, HostBinding, Input } from '@angular/core'
import { ExperienceItem } from './experience-item'
import {
  Badge,
  More,
  School,
  ToolsLadder,
  Work,
} from '../../../material-symbols'
import { SlugGeneratorService } from '../../../common/slug-generator.service'
import { ChippedContent } from '../../chipped-content/chipped-content'
import { ExperienceItemSummaryComponent } from './experience-item-summary/experience-item-summary.component'
import { ExperienceItemHighlightsComponent } from './experience-item-highlights/experience-item-highlights.component'
import { firstValueFrom } from 'rxjs'
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
import { TestIdDirective } from '../../../common/test-id.directive'
import { LinkComponent } from '../../link/link.component'
import { CardHeaderComponent } from '../../card/card-header/card-header.component'
import { CardComponent } from '../../card/card.component'

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
  static readonly EXPANDED_CLASS = 'expanded'
  @Input({ required: true }) public item!: ExperienceItem
  protected readonly MaterialSymbol = {
    Badge,
    Work,
    School,
    ToolsLadder,
    More,
  }
  protected readonly Attribute = Attribute

  public get contents() {
    const contents = []
    if (this.item.summary) {
      contents.push(
        new ChippedContent({
          id: ContentId.Summary,
          displayName: 'Summary',
          component: ExperienceItemSummaryComponent,
          setupComponent: (component) => {
            component.summary = this.item.summary
          },
          waitForAnimationEnd: async (component) => {
            await firstValueFrom(component.enterAndLeaveAnimationDone)
          },
        }),
      )
    }
    if (this.item.highlights.length > 0) {
      contents.push(
        new ChippedContent({
          id: ContentId.Highlights,
          displayName: 'Highlights',
          component: ExperienceItemHighlightsComponent,
          setupComponent: (component) => {
            component.highlights = this.item.highlights
          },
          waitForAnimationEnd: async (component) => {
            await firstValueFrom(component.enterAndLeaveAnimationDone)
          },
        }),
      )
    }
    return contents
  }
  @HostBinding(`class.${ExperienceItemComponent.EXPANDED_CLASS}`)
  public expanded?: boolean

  constructor(private slugGenerator: SlugGeneratorService) {}

  public getAttributeId(attributeName: string) {
    return `${this.itemId}${attributeName}`
  }

  private get itemId() {
    return this.slugGenerator.generate(this.item.company.name, {
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
