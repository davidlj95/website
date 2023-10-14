import { Component, Input } from '@angular/core'
import { ExperienceItem } from './experience-item'
import { MATERIAL_SYMBOLS_CLASS } from '../../../common/material-symbols'
import {
  Badge,
  More,
  School,
  ToolsLadder,
  Work,
} from '../../../material-symbols'
import { SlugGeneratorService } from '../../../common/slug-generator.service'
import {
  animate,
  AUTO_STYLE,
  style,
  transition,
  trigger,
} from '@angular/animations'
import {
  STANDARD_DURATION_MS,
  TIMING_FUNCTION,
} from '../../../common/animations'
import { ChippedContent } from '../../chipped-content/chipped-content'
import { ExperienceItemSummaryComponent } from './experience-item-summary/experience-item-summary.component'
import { ExperienceItemHighlightsComponent } from './experience-item-highlights/experience-item-highlights.component'

@Component({
  selector: 'app-experience-item',
  templateUrl: './experience-item.component.html',
  styleUrls: ['./experience-item.component.scss'],
  animations: [
    trigger('contentActive', [
      transition(':enter', [
        style({ height: '0', visibility: 'hidden' }),
        animate(
          `${STANDARD_DURATION_MS}ms ${TIMING_FUNCTION}`,
          style({ height: AUTO_STYLE, visibility: AUTO_STYLE }),
        ),
      ]),
      transition(':leave', [
        style({ height: AUTO_STYLE, visibility: AUTO_STYLE }),
        animate(
          `${STANDARD_DURATION_MS}ms ${TIMING_FUNCTION}`,
          style({ height: '0', visibility: 'hidden' }),
        ),
      ]),
    ]),
  ],
})
export class ExperienceItemComponent {
  @Input({ required: true }) public item!: ExperienceItem
  protected readonly MATERIAL_SYMBOLS_CLASS = MATERIAL_SYMBOLS_CLASS
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
        }),
      )
    }
    return contents
  }

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
