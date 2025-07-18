import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  input,
  model,
  viewChildren,
  inject,
} from '@angular/core'
import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common'
import {
  animate,
  AUTO_STYLE,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations'
import { EMPHASIZED_DURATION_MS, TIMING_FUNCTION } from '@/common/animations'
import { CollapsibleTreeNode } from './collapsible-tree-node'

export type IsCollapsibleFn = (node: CollapsibleTreeComponent) => boolean

// Pattern for unique id generation
// https://github.com/angular/components/blob/17.3.0/src/cdk/a11y/aria-describer/aria-describer.ts#L47-L48
const COLLAPSIBLE_TREE_COMPONENT_CONTROLS_ID_PREFIX = `ctc-cid-`
let nextId = 0

@Component({
  selector: 'app-collapsible-tree',
  imports: [NgTemplateOutlet, NgComponentOutlet],
  templateUrl: './collapsible-tree.component.html',
  styleUrl: './collapsible-tree.component.scss',
  animations: [
    trigger('expanded', [
      state('true', style({ height: AUTO_STYLE, visibility: AUTO_STYLE })),
      state('false', style({ height: '0', visibility: 'hidden' })),
      transition(
        'true => false',
        animate(`${EMPHASIZED_DURATION_MS}ms ${TIMING_FUNCTION}`),
      ),
      transition(
        'false => true',
        animate(`${EMPHASIZED_DURATION_MS}ms ${TIMING_FUNCTION}`),
      ),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollapsibleTreeComponent {
  private readonly _cdRef = inject(ChangeDetectorRef)

  readonly node = input.required<CollapsibleTreeNode>()
  readonly depth = input(0)
  readonly parent = input<CollapsibleTreeComponent>()
  readonly isCollapsibleFn = input<IsCollapsibleFn>()
  readonly isExpanded = model(false)

  readonly _children = viewChildren(CollapsibleTreeComponent)

  private readonly _id = nextId++

  get isCollapsible(): boolean {
    const isCollapsibleFn =
      this.isCollapsibleFn() ?? this.parent()?.isCollapsibleFn()
    return this.node().children.length === 0 || !isCollapsibleFn
      ? false
      : isCollapsibleFn(this)
  }

  get childListId(): string | undefined {
    if (!this.isCollapsible) {
      return
    }
    return `${COLLAPSIBLE_TREE_COMPONENT_CONTROLS_ID_PREFIX}${this._id}`
  }

  collapse() {
    if (this.isExpanded()) {
      this.isExpanded.set(false)
      this._cdRef.markForCheck()
    }
  }

  expand() {
    if (!this.isExpanded()) {
      this.isExpanded.set(true)
      this.parent()?.collapseAllChildren({ except: this })
    }
  }

  collapseAllChildren({ except }: { except?: CollapsibleTreeComponent } = {}) {
    const childrenToCollapse = this._children().filter(
      (child) => child !== except,
    )
    for (const child of childrenToCollapse) {
      child.collapse()
    }
  }
}
