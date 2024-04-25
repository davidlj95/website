import { Component, Input } from '@angular/core'
import { ProjectItem, Stack } from './project-item'
import { Apps, Dns, FullStackedBarChart } from '../../../material-symbols'
import { ChippedContent } from '../../chipped-content/chipped-content'
import { ChippedContentComponent } from '../../chipped-content/chipped-content.component'
import { AttributeComponent } from '../../attribute/attribute.component'
import { CardHeaderAttributesComponent } from '../../card/card-header/card-header-attributes/card-header-attributes.component'
import { DateRangeComponent } from '../../date-range/date-range.component'
import { CardHeaderDetailComponent } from '../../card/card-header/card-header-detail/card-header-detail.component'
import { CardHeaderSubtitleComponent } from '../../card/card-header/card-header-subtitle/card-header-subtitle.component'
import { CardHeaderTitleComponent } from '../../card/card-header/card-header-title/card-header-title.component'
import { CardHeaderTextsComponent } from '../../card/card-header/card-header-texts/card-header-texts.component'
import { CardHeaderImageComponent } from '../../card/card-header/card-header-image/card-header-image.component'
import { TestIdDirective } from '@/common/test-id.directive'
import { LinkComponent } from '../../link/link.component'
import { NgIf } from '@angular/common'
import { CardHeaderComponent } from '../../card/card-header/card-header.component'
import { CardComponent } from '../../card/card.component'
import { projectItemToContents } from './project-item-to-contents'

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
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
  ],
})
export class ProjectItemComponent {
  @Input({ required: true }) public set item(item: ProjectItem) {
    this._item = item
    this._contents = projectItemToContents(item)
  }

  protected _item!: ProjectItem
  protected _contents: ReadonlyArray<ChippedContent> = []

  protected readonly StackContent = StackContent
  protected readonly Attribute = Attribute
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
