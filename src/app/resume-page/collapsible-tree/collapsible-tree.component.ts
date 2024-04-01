import {
  Component,
  Inject,
  Input,
  QueryList,
  ViewChildren,
} from '@angular/core'
import { MaterialSymbolDirective } from '@/common/material-symbol.directive'
import {
  NgClass,
  NgComponentOutlet,
  NgForOf,
  NgIf,
  NgTemplateOutlet,
} from '@angular/common'
import { PLATFORM_SERVICE, PlatformService } from '@/common/platform.service'
import {
  DISPLAY_FLEX_IF_NO_SCRIPT_CLASS,
  VISIBILITY_HIDDEN_IF_NO_SCRIPT_CLASS,
} from '@/common/no-script'
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
    NgIf,
    NgTemplateOutlet,
    NgClass,
    NgForOf,
    NgComponentOutlet,
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
  public isExpanded = this._platformService.isServer

  @ViewChildren(CollapsibleTreeComponent)
  private children!: QueryList<CollapsibleTreeComponent>

  protected readonly VISIBILITY_HIDDEN_IF_NO_SCRIPT_CLASS =
    VISIBILITY_HIDDEN_IF_NO_SCRIPT_CLASS
  protected readonly DISPLAY_FLEX_IF_NO_SCRIPT_CLASS =
    DISPLAY_FLEX_IF_NO_SCRIPT_CLASS
  private readonly _id = nextId++

  constructor(
    @Inject(PLATFORM_SERVICE)
    protected readonly _platformService: PlatformService,
  ) {}

  public get isCollapsible(): boolean {
    if (!(this.node.children.length > 0)) {
      return false
    }
    if (!this.isCollapsibleFn) {
      return false
    }
    return this.isCollapsibleFn(this)
  }

  public get sluggedId(): string | undefined {
    if (!this.isCollapsible) {
      return
    }
    return `${COLLAPSIBLE_TREE_COMPONENT_CONTROLS_ID_PREFIX}${this._id}`
  }

  collapse() {
    this.isExpanded = false
  }

  expand() {
    this.isExpanded = true
    this.parent?.collapseAllChildren({ except: this })
  }

  collapseAllChildren({ except }: { except?: CollapsibleTreeComponent } = {}) {
    const childrenToCollapse = this.children.filter((child) => child !== except)
    for (const child of childrenToCollapse) {
      child.collapse()
    }
  }
}
