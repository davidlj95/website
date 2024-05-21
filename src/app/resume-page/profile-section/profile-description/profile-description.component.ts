import { Component, Inject } from '@angular/core'
import { METADATA } from '@/common/injection-tokens'
import { DescriptionLine, Metadata } from '../../../metadata'
import {
  CollapsibleTreeComponent,
  IsCollapsibleFn,
} from '../../collapsible-tree/collapsible-tree.component'
import {
  CollapsibleTreeNode,
  CollapsibleTreeNodeData,
} from '../../collapsible-tree/collapsible-tree-node'
import { ProfileDescriptionLineComponent } from './profile-description-line/profile-description-line.component'

@Component({
  selector: 'app-profile-description',
  template: `
    <app-collapsible-tree
      [node]="ROOT_NODE"
      [isCollapsibleFn]="IS_COLLAPSIBLE_FN"
    ></app-collapsible-tree>
  `,
  standalone: true,
  imports: [CollapsibleTreeComponent],
})
export class ProfileDescriptionComponent {
  protected readonly ROOT_NODE = new CollapsibleTreeNode(
    undefined,
    this.metadata.descriptionLines.map(descriptionLineToCollapsibleTreeNode),
  )

  protected readonly IS_COLLAPSIBLE_FN: IsCollapsibleFn = (
    node: CollapsibleTreeComponent,
  ) => node.depth > 1

  constructor(@Inject(METADATA) private readonly metadata: Metadata) {}
}

const descriptionLineToCollapsibleTreeNode = (
  line: DescriptionLine,
): CollapsibleTreeNode =>
  new CollapsibleTreeNode(
    new CollapsibleTreeNodeData(ProfileDescriptionLineComponent, {
      inputs: { line } satisfies Partial<ProfileDescriptionLineComponent>,
    }),
    line.children.map(descriptionLineToCollapsibleTreeNode),
  )
