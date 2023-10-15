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

@Component({
  selector: 'app-experience-item',
  templateUrl: './experience-item.component.html',
  styleUrls: ['./experience-item.component.scss'],
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
