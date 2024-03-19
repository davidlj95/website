import { NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common'
import { Component, Inject } from '@angular/core'
import { MaterialSymbolDirective } from '../../../common/material-symbol.directive'
import { METADATA } from '../../../common/injection-tokens'
import { Metadata } from '../../../metadata'
import { CollapsibleTreeChildrenComponent } from '../../collapsible-tree/collapsible-tree-children/collapsible-tree-children.component'
import {
  CollapsibleTreeNodeComponent,
  IsCollapsibleFn,
} from '../../collapsible-tree/collapsible-tree-node/collapsible-tree-node.component'

@Component({
  selector: 'app-profile-description',
  template: `<app-collapsible-tree-children
    [children]="DESCRIPTION_LINES"
    [isCollapsibleFn]="IS_COLLAPSIBLE_FN"
  ></app-collapsible-tree-children> `,
  standalone: true,
  imports: [
    NgIf,
    NgTemplateOutlet,
    MaterialSymbolDirective,
    NgFor,
    NgClass,
    CollapsibleTreeChildrenComponent,
  ],
})
export class ProfileDescriptionComponent {
  protected readonly DESCRIPTION_LINES = this.metadata.descriptionLines
  protected readonly IS_COLLAPSIBLE_FN: IsCollapsibleFn = (
    node: CollapsibleTreeNodeComponent,
  ) => node.depth > 2

  constructor(@Inject(METADATA) private readonly metadata: Metadata) {}
}
