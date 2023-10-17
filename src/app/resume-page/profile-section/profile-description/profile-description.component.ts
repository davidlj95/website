import {
  animate,
  AUTO_STYLE,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations'
import { isPlatformBrowser } from '@angular/common'
import {
  Component,
  HostBinding,
  Inject,
  InjectionToken,
  Input,
  PLATFORM_ID,
  QueryList,
  ViewChildren,
} from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'
import {
  EMPHASIZED_DURATION_MS,
  TIMING_FUNCTION,
} from '../../../common/animations'
import { DescriptionLine } from '../../../metadata'
import { SlugGeneratorService } from '../../../common/slug-generator.service'

@Component({
  selector: 'app-profile-description',
  templateUrl: './profile-description.component.html',
  styleUrls: ['./profile-description.component.scss'],
  animations: [
    trigger('expanded', [
      // TODO: Investigate how to set display in state without triggering Angular warning
      //       Tried:
      //        - Animation callbacks: they mess up the animation
      //        - In CSS display: none, whilst :not(.ng-animating). Messes animation too
      // Display state is needed so that elements don't make the body overflow in some devices
      state(
        'true',
        style({ height: AUTO_STYLE, visibility: AUTO_STYLE, display: 'flex' }),
      ),
      state(
        'false',
        style({ height: '0', visibility: 'hidden', display: 'none' }),
      ),
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
export class ProfileDescriptionComponent {
  @Input({ required: true }) public line!: DescriptionLine
  @Input() public depth: number = 0
  @Input() protected parent?: ProfileDescriptionComponent

  // 👇 Using `protected` to avoid being marked as unused
  @HostBinding('class.displayBlockIfNoScript')
  protected readonly visibleIfNoScript = true
  @HostBinding('class.hidden') protected hidden = !this.isRenderingOnBrowser

  private readonly EXPANDED_DEFAULT_NO_JS = true
  private readonly EXPANDED_DEFAULT_JS_ENABLED = false
  public isExpanded = this.isRenderingOnBrowser
    ? this.EXPANDED_DEFAULT_JS_ENABLED
    : this.EXPANDED_DEFAULT_NO_JS
  @ViewChildren(ProfileDescriptionComponent)
  private children!: QueryList<ProfileDescriptionComponent>

  constructor(
    protected readonly sanitizer: DomSanitizer,
    @Inject(COLLAPSIBLE_CONFIG)
    protected readonly config: CollapsibleConfiguration,
    @Inject(PLATFORM_ID) private readonly platformId: object,
    private readonly slugIdGenerator: SlugGeneratorService,
  ) {}

  protected get isRenderingOnBrowser() {
    return isPlatformBrowser(this.platformId)
  }

  public get isCollapsible(): boolean {
    return (
      this.depth >= this.config.collapsibleStartAtDepth &&
      this.line.children.length > 0
    )
  }

  public get sluggedId(): string | undefined {
    if (!this.isCollapsible) {
      return
    }
    const lineText = this.line?.data?.text
    if (!lineText) {
      return undefined
    }
    return this.slugIdGenerator.generate(lineText, {
      prefix: this.config.listIdPrefix,
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

  collapseAllChildren({
    except,
  }: { except?: ProfileDescriptionComponent } = {}) {
    const childrenToCollapse = this.children.filter((child) => child !== except)
    for (const child of childrenToCollapse) {
      child.collapse()
    }
  }
}

export interface CollapsibleConfiguration {
  collapsibleStartAtDepth: number
  collapsedIcon: string
  expandedIcon: string
  listIdPrefix: string
}

/* istanbul ignore next */
export const COLLAPSIBLE_CONFIG = new InjectionToken<CollapsibleConfiguration>(
  'Collapsible configuration for description component',
  {
    factory: () => DEFAULT_COLLAPSIBLE_CONFIG,
  },
)

const DEFAULT_COLLAPSIBLE_CONFIG: CollapsibleConfiguration = {
  collapsibleStartAtDepth: 2,
  collapsedIcon: '▶',
  expandedIcon: '▼',
  listIdPrefix: 'description-',
}
