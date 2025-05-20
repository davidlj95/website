import { Component, computed, input } from '@angular/core'
import { Project, Stack } from '../../../data/project'
import { Apps, Dns, FullStackedBarChart } from '@/data/material-symbols'
import { ChippedContent } from '@/common/chipped-content/chipped-content'
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
import { projectToContents } from './project-to-contents'

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
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
export class ProjectComponent {
  readonly project = input.required<Project>()
  protected readonly _contents = computed<readonly ChippedContent[]>(() =>
    projectToContents(this.project()),
  )

  protected readonly _stackContent = STACK_CONTENT
  protected readonly _attribute = ATTRIBUTE
}
/** @visibleForTesting */
export const STACK_CONTENT: Record<
  Stack,
  {
    displayName: string
    materialSymbol: string
  }
> = {
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
/** @visibleForTesting */
export const ATTRIBUTE = { Stack: 'stack' }
