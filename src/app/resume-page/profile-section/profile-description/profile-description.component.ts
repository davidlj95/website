import { NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common'
import { Component, Inject } from '@angular/core'
import { MaterialSymbolDirective } from '../../../common/material-symbol.directive'
import { METADATA } from '../../../common/injection-tokens'
import { DescriptionLine, Metadata } from '../../../metadata'
import {
  CollapsibleTreeComponent,
  IsCollapsibleFn,
} from '../../collapsible-tree/collapsible-tree.component'

@Component({
  selector: 'app-profile-description',
  template: `<app-collapsible-tree
    [line]="ROOT_LINE"
    [isCollapsibleFn]="IS_COLLAPSIBLE_FN"
  ></app-collapsible-tree> `,
  standalone: true,
  imports: [
    NgIf,
    NgTemplateOutlet,
    MaterialSymbolDirective,
    NgFor,
    NgClass,
    CollapsibleTreeComponent,
  ],
})
export class ProfileDescriptionComponent {
  protected readonly ROOT_LINE = new DescriptionLine(
    undefined,
    this.metadata.descriptionLines,
  )
  protected readonly IS_COLLAPSIBLE_FN: IsCollapsibleFn = (
    node: CollapsibleTreeComponent,
  ) => node.depth > 1

  constructor(@Inject(METADATA) private readonly metadata: Metadata) {}
}
