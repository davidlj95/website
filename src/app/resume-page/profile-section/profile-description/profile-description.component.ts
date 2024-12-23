import { ChangeDetectionStrategy, Component, Inject } from '@angular/core'
import { METADATA } from '@/common/injection-tokens'
import { DescriptionLine, Metadata } from '@/data/metadata'
import {
  CollapsibleTreeComponent,
  IsCollapsibleFn,
} from '../../collapsible-tree/collapsible-tree.component'
import {
  CollapsibleTreeNode,
  CollapsibleTreeNodeData,
} from '../../collapsible-tree/collapsible-tree-node'
import { ProfileDescriptionLineComponent } from './profile-description-line/profile-description-line.component'
import { ComponentInputs } from '@/common/component-inputs'

@Component({
  selector: 'app-profile-description',
  template: `
    <app-collapsible-tree
      [node]="_rootNode"
      [isCollapsibleFn]="_isCollapsibleFn"
    ></app-collapsible-tree>
  `,
  imports: [CollapsibleTreeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileDescriptionComponent {
  protected readonly _rootNode: CollapsibleTreeNode
  protected readonly _isCollapsibleFn: IsCollapsibleFn = (
    node: CollapsibleTreeComponent,
  ) => node.depth > 1

  constructor(@Inject(METADATA) metadata: Metadata) {
    this._rootNode = new CollapsibleTreeNode(
      undefined,
      metadata.descriptionLines.map(descriptionLineToCollapsibleTreeNode),
    )
  }
}

const descriptionLineToCollapsibleTreeNode = (
  line: DescriptionLine,
): CollapsibleTreeNode =>
  new CollapsibleTreeNode(
    /* istanbul ignore next */
    line.data
      ? new CollapsibleTreeNodeData(ProfileDescriptionLineComponent, {
          inputs: {
            data: line.data,
          } satisfies ComponentInputs<ProfileDescriptionLineComponent>,
        })
      : undefined,
    line.children.map(descriptionLineToCollapsibleTreeNode),
  )
