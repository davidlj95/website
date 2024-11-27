import { NgComponentOutlet } from '@angular/common'

export class CollapsibleTreeNode {
  constructor(
    readonly data?: CollapsibleTreeNodeData,
    readonly children: readonly CollapsibleTreeNode[] = [],
  ) {}
}

export class CollapsibleTreeNodeData {
  constructor(
    readonly component: NgComponentOutlet['ngComponentOutlet'],
    readonly options: {
      inputs?: NgComponentOutlet['ngComponentOutletInputs']
    } = {},
  ) {}
}
