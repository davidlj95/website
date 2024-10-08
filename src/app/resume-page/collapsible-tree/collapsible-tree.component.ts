import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  QueryList,
  ViewChildren,
} from '@angular/core'
import { MaterialSymbolDirective } from '@/common/material-symbol.directive'
import { NgComponentOutlet, NgForOf, NgTemplateOutlet } from '@angular/common'
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
  standalone: true,
  imports: [
    MaterialSymbolDirective,
    NgTemplateOutlet,
    NgComponentOutlet,
    NgForOf,
  ],
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
  @Input({ required: true }) public node!: CollapsibleTreeNode
  @Input() public depth: number = 0
  @Input() public parent?: CollapsibleTreeComponent
  @Input() public collapsedIcon: string = this.parent?.collapsedIcon ?? '▶'
  @Input() public expandedIcon: string = this.parent?.expandedIcon ?? '▼'
  @Input() public isCollapsibleFn?: IsCollapsibleFn =
    this.parent?.isCollapsibleFn
  @Input()
  public isExpanded = false

  @ViewChildren(CollapsibleTreeComponent)
  private children!: QueryList<CollapsibleTreeComponent>

  private readonly _id = nextId++

  constructor(private readonly cdRef: ChangeDetectorRef) {}

  public get isCollapsible(): boolean {
    if (!(this.node.children.length > 0)) {
      return false
    }
    if (!this.isCollapsibleFn) {
      return false
    }
    return this.isCollapsibleFn(this)
  }

  public get childListId(): string | undefined {
    if (!this.isCollapsible) {
      return
    }
    return `${COLLAPSIBLE_TREE_COMPONENT_CONTROLS_ID_PREFIX}${this._id}`
  }

  collapse() {
    if (this.isExpanded) {
      this.isExpanded = false
      this.cdRef.markForCheck()
    }
  }

  expand() {
    if (!this.isExpanded) {
      this.isExpanded = true
      this.parent?.collapseAllChildren({ except: this })
    }
  }

  collapseAllChildren({ except }: { except?: CollapsibleTreeComponent } = {}) {
    const childrenToCollapse = this.children.filter((child) => child !== except)
    for (const child of childrenToCollapse) {
      child.collapse()
    }
  }
}
