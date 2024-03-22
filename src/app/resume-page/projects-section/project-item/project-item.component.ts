import { Component, Input } from '@angular/core'
import { ProjectItem, Stack } from './project-item'
import { SlugGeneratorService } from '@common/slug-generator.service'
import { Apps, Dns, FullStackedBarChart } from '../../../material-symbols'
import { ChippedContent } from '../../chipped-content/chipped-content'
import { ProjectItemDescriptionComponent } from './project-item-description/project-item-description.component'
import { firstValueFrom } from 'rxjs'
import { ChippedContentComponent } from '../../chipped-content/chipped-content.component'
import { AttributeComponent } from '../../attribute/attribute.component'
import { CardHeaderAttributesComponent } from '../../card/card-header/card-header-attributes/card-header-attributes.component'
import { DateRangeComponent } from '../../date-range/date-range.component'
import { CardHeaderDetailComponent } from '../../card/card-header/card-header-detail/card-header-detail.component'
import { CardHeaderSubtitleComponent } from '../../card/card-header/card-header-subtitle/card-header-subtitle.component'
import { CardHeaderTitleComponent } from '../../card/card-header/card-header-title/card-header-title.component'
import { CardHeaderTextsComponent } from '../../card/card-header/card-header-texts/card-header-texts.component'
import { CardHeaderImageComponent } from '../../card/card-header/card-header-image/card-header-image.component'
import { TestIdDirective } from '@common/test-id.directive'
import { LinkComponent } from '../../link/link.component'
import { AsyncPipe, NgIf } from '@angular/common'
import { CardHeaderComponent } from '../../card/card-header/card-header.component'
import { CardComponent } from '../../card/card.component'
import { ProjectItemTechnologiesComponent } from './project-item-technologies/project-item-technologies.component'

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
  standalone: true,
  imports: [
    CardComponent,
    CardHeaderComponent,
    NgIf,
    LinkComponent,
    TestIdDirective,
    CardHeaderImageComponent,
    CardHeaderTextsComponent,
    CardHeaderTitleComponent,
    CardHeaderSubtitleComponent,
    CardHeaderDetailComponent,
    DateRangeComponent,
    CardHeaderAttributesComponent,
    AttributeComponent,
    ChippedContentComponent,
    AsyncPipe,
  ],
})
export class ProjectItemComponent {
  @Input({ required: true }) public item!: ProjectItem

  public get contents() {
    const contents = []
    if (this.item.description) {
      contents.push(
        new ChippedContent({
          id: ContentId.Description,
          displayName: 'Description',
          component: ProjectItemDescriptionComponent,
          setupComponent: (component) => {
            component.description = this.item.description
          },
          waitForAnimationEnd: async (component) => {
            await firstValueFrom(component.enterAndLeaveAnimationDone)
          },
        }),
      )
    }
    if (this.item.technologies.length > 0) {
      contents.push(
        new ChippedContent({
          id: ContentId.Technologies,
          displayName: 'Tech',
          component: ProjectItemTechnologiesComponent,
          setupComponent: (component) => {
            component.technologies = this.item.technologies
          },
          waitForAnimationEnd: async () => {},
        }),
      )
    }
    return contents
  }
  protected readonly StackContent = StackContent
  protected readonly Attribute = Attribute

  constructor(private slugGenerator: SlugGeneratorService) {}

  private get itemId(): string {
    return `project-${this.slugGenerator.generate(this.item.name)}`
  }

  public getAttributeId(attribute: Attribute): string {
    return `${this.itemId}-${attribute}`
  }
}

export enum Attribute {
  Stack = 'stack',
}

export const StackContent: { [Property in Stack]: StackContent } = {
  [Stack.Back]: {
    displayName: 'Backend',
    materialSymbol: Dns,
  },
  [Stack.Front]: { displayName: 'Frontend', materialSymbol: Apps },
  [Stack.Full]: {
    displayName: 'Full stack',
    materialSymbol: FullStackedBarChart,
  },
}

export interface StackContent {
  displayName: string
  materialSymbol: string
}

export enum ContentId {
  Description = 'description',
  Technologies = 'tech',
}
