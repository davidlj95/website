import {
  Component,
  Inject,
  Input,
  QueryList,
  ViewChildren,
} from '@angular/core'
import { DescriptionLine } from '../../metadata'
import { MaterialSymbolDirective } from '../../common/material-symbol.directive'
import { NgClass, NgForOf, NgIf, NgTemplateOutlet } from '@angular/common'
import { SlugGeneratorService } from '../../common/slug-generator.service'
import {
  PLATFORM_SERVICE,
  PlatformService,
} from '../../common/platform.service'
import {
  DISPLAY_FLEX_IF_NO_SCRIPT_CLASS,
  VISIBILITY_HIDDEN_IF_NO_SCRIPT_CLASS,
} from '../../common/no-script'
import { DomSanitizer } from '@angular/platform-browser'
import {
  animate,
  AUTO_STYLE,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations'
import {
  EMPHASIZED_DURATION_MS,
  TIMING_FUNCTION,
} from '../../common/animations'

export type IsCollapsibleFn = (node: CollapsibleTreeComponent) => boolean

@Component({
  selector: 'app-collapsible-tree',
  standalone: true,
  imports: [MaterialSymbolDirective, NgIf, NgTemplateOutlet, NgClass, NgForOf],
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
  @Input({ required: true }) public line!: DescriptionLine
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

  constructor(
    private readonly _slugIdGenerator: SlugGeneratorService,
    @Inject(PLATFORM_SERVICE)
    protected readonly _platformService: PlatformService,
    protected readonly sanitizer: DomSanitizer,
  ) {}

  public get isCollapsible(): boolean {
    if (!(this.line.children.length > 0)) {
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
    this.parent?.collapseAllChildren({ except: this })
  }

  collapseAllChildren({ except }: { except?: CollapsibleTreeComponent } = {}) {
    const childrenToCollapse = this.children.filter((child) => child !== except)
    for (const child of childrenToCollapse) {
      child.collapse()
    }
  }
}
