import { NgComponentOutlet } from '@angular/common'

export class CollapsibleTreeNode {
  constructor(
    public readonly data?: CollapsibleTreeNodeData,
    public readonly children: ReadonlyArray<CollapsibleTreeNode> = [],
  ) {}
}

export class CollapsibleTreeNodeData {
  constructor(
    public readonly component: NgComponentOutlet['ngComponentOutlet'],
    public readonly options: {
      inputs?: NgComponentOutlet['ngComponentOutletInputs']
    } = {},
  ) {}
}
