import { Component, forwardRef, Inject, Input, ViewChild } from '@angular/core'
import { DescriptionLine } from '../../../metadata'
import { CollapsibleTreeChildrenComponent } from '../collapsible-tree-children/collapsible-tree-children.component'
import { MaterialSymbolDirective } from '../../../common/material-symbol.directive'
import { NgClass, NgIf, NgTemplateOutlet } from '@angular/common'
import { SlugGeneratorService } from '../../../common/slug-generator.service'
import {
  PLATFORM_SERVICE,
  PlatformService,
} from '../../../common/platform.service'
import { VISIBILITY_HIDDEN_IF_NO_SCRIPT_CLASS } from '../../../common/no-script'
import { DomSanitizer } from '@angular/platform-browser'

/**
 * @visibleForTesting
 */
export const COLLAPSIBLE_TREE_CHILDREN_COMPONENT_FORWARD_REF = forwardRef(
  () => CollapsibleTreeChildrenComponent,
)

export type IsCollapsibleFn = (node: CollapsibleTreeNodeComponent) => boolean

@Component({
  selector: 'app-collapsible-tree-node',
  standalone: true,
  imports: [
    MaterialSymbolDirective,
    NgIf,
    NgTemplateOutlet,
    NgClass,
    COLLAPSIBLE_TREE_CHILDREN_COMPONENT_FORWARD_REF,
  ],
  templateUrl: './collapsible-tree-node.component.html',
  styleUrl: './collapsible-tree-node.component.scss',
})
export class CollapsibleTreeNodeComponent {
  @Input({ required: true }) public line!: DescriptionLine
  @Input() public depth: number = 0
  @Input() public parent?: CollapsibleTreeNodeComponent
  @Input() public collapsedIcon: string = this.parent?.collapsedIcon ?? '▶'
  @Input() public expandedIcon: string = this.parent?.expandedIcon ?? '▼'
  @Input() public isCollapsibleFn?: IsCollapsibleFn =
    this.parent?.isCollapsibleFn
  public get isCollapsible(): boolean {
    if (!(this.line.children.length > 0)) {
      return false
    }
    if (!this.isCollapsibleFn) {
      return false
    }
    return this.isCollapsibleFn(this)
  }
  @Input()
  public isExpanded = this._platformService.isServer
  protected readonly VISIBILITY_HIDDEN_IF_NO_SCRIPT_CLASS =
    VISIBILITY_HIDDEN_IF_NO_SCRIPT_CLASS
  /**
   * @visibleForTesting
   */
  @ViewChild(COLLAPSIBLE_TREE_CHILDREN_COMPONENT_FORWARD_REF)
  public children!: CollapsibleTreeChildrenComponent

  constructor(
    private readonly _slugIdGenerator: SlugGeneratorService,
    @Inject(PLATFORM_SERVICE)
    protected readonly _platformService: PlatformService,
    protected readonly sanitizer: DomSanitizer,
  ) {}

  public get sluggedId(): string | undefined {
    if (!this.isCollapsible) {
      return
    }
    const lineText = this.line?.data?.text
    if (!lineText) {
      return undefined
    }
    return this._slugIdGenerator.generate(lineText, {
      prefix: 'ctnc-',
      firstCharIsALetter: true,
    })
  }

  collapse() {
    this.isExpanded = false
  }

  expand() {
    this.isExpanded = true
    this.parent?.children.collapseAllChildren({ except: this })
  }
}
