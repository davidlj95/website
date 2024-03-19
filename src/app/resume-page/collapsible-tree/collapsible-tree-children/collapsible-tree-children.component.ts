import {
  Component,
  Inject,
  Input,
  QueryList,
  ViewChildren,
} from '@angular/core'
import { NgClass, NgForOf, NgIf } from '@angular/common'
import { DescriptionLine } from '../../../metadata'
import {
  PLATFORM_SERVICE,
  PlatformService,
} from '../../../common/platform.service'
import { DISPLAY_FLEX_IF_NO_SCRIPT_CLASS } from 'src/app/common/no-script'
import { CollapsibleTreeNodeComponent } from '../collapsible-tree-node/collapsible-tree-node.component'
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
} from '../../../common/animations'

@Component({
  selector: 'app-collapsible-tree-children',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    NgIf,
    // https://angular.io/api/core/forwardRef#circular-standalone-reference-import-example
    CollapsibleTreeNodeComponent,
  ],
  templateUrl: './collapsible-tree-children.component.html',
  styleUrl: './collapsible-tree-children.component.scss',
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
export class CollapsibleTreeChildrenComponent {
  @Input({ required: true }) public children: DescriptionLine['children'] = []
  @Input() public id?: string
  @Input() public isCollapsibleFn = this.parent?.isCollapsibleFn
  @Input() public isCollapsible = false
  @Input() public isExpanded = false
  @Input() public depth = 0
  @Input() public parent?: CollapsibleTreeNodeComponent = undefined

  @ViewChildren(CollapsibleTreeNodeComponent)
  private childComponents!: QueryList<CollapsibleTreeNodeComponent>

  //👇 Keep in sync with CSS
  protected readonly HIDDEN_CLASS = 'hidden'

  constructor(
    @Inject(PLATFORM_SERVICE)
    protected readonly _platformService: PlatformService,
  ) {}

  protected readonly DISPLAY_FLEX_IF_NO_SCRIPT_CLASS =
    DISPLAY_FLEX_IF_NO_SCRIPT_CLASS

  collapseAllChildren({
    except,
  }: { except?: CollapsibleTreeNodeComponent } = {}) {
    const childrenToCollapse = this.childComponents.filter(
      (child) => child !== except,
    )
    for (const child of childrenToCollapse) {
      child.collapse()
    }
  }
}
