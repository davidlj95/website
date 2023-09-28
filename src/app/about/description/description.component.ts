import { animate, AUTO_STYLE, state, style, transition, trigger } from '@angular/animations';
import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  HostBinding,
  Inject,
  InjectionToken,
  Input,
  PLATFORM_ID,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { EMPHASIZED_DURATION_MS, TIMING_FUNCTION } from '../../common/animations';
import { DescriptionLine } from '../../metadata';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss'],
  animations: [
    trigger('expanded', [
      // TODO: Investigate how to set display in state without triggering Angular warning
      //       Tried:
      //        - Animation callbacks: they mess up the animation
      //        - In CSS display: none, whilst :not(.ng-animating). Messes animation too
      // Display state is needed so that elements don't make the body overflow in some devices
      state('true', style({height: AUTO_STYLE, visibility: AUTO_STYLE, display: 'flex'})),
      state('false', style({height: '0', visibility: 'hidden', display: 'none'})),
      transition('true => false', animate(`${EMPHASIZED_DURATION_MS}ms ${TIMING_FUNCTION}`)),
      transition('false => true', animate(`${EMPHASIZED_DURATION_MS}ms ${TIMING_FUNCTION}`)),
    ]),
  ],
})
export class DescriptionComponent {
  @Input({required: true}) public line!: DescriptionLine
  @Input() public depth: number = 0
  @Input() protected parent?: DescriptionComponent

  // 👇 Using `protected` to avoid being marked as unused
  @HostBinding('class.visibleIfNoScript') protected visibleIfNoScript = true
  @HostBinding('class.hidden') protected hidden = true

  private EXPANDED_DEFAULT_NO_JS = true
  private EXPANDED_DEFAULT_JS_ENABLED = false
  public isExpanded = this.EXPANDED_DEFAULT_NO_JS

 @ViewChildren(DescriptionComponent)
  private children!: QueryList<DescriptionComponent>

  constructor(
    protected sanitizer: DomSanitizer,
    @Inject(COLLAPSIBLE_CONFIG) protected config: CollapsibleConfiguration,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.isExpanded = this.EXPANDED_DEFAULT_JS_ENABLED
      this.hidden = false
    }
  }

  public get isCollapsible(): boolean {
    return this.depth >= this.config.collapsibleStartAtDepth && this.line.children.length > 0
  }

  public get sluggedId(): string | undefined {
    if (!this.isCollapsible) {
      return
    }
    return this.config.listIdPrefix + this.line.data?.text.toString().toLowerCase()
      .replace(/\s+/g, '-')         // Replace spaces with -
      .replace(/[^\w-]+/g, '')      // Remove all non-word chars
      .replace(/--+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')           // Trim - from start of text
      .replace(/-+$/, '')           // Trim - from end of text
      .replace(/^\d/, '')
  }

  collapse() {
    this.isExpanded = false
  }

  expand() {
    this.isExpanded = true
    this.parent?.collapseAllChildren({except: this})
  }

  collapseAllChildren({except}: {except?: DescriptionComponent} = {}) {
    const childrenToCollapse = this.children
      .filter((child) => child !== except)
    for(const child of childrenToCollapse) {
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
  'Collapsible configuration for description component', {
    factory: () => DEFAULT_COLLAPSIBLE_CONFIG,
  },
)

const DEFAULT_COLLAPSIBLE_CONFIG: CollapsibleConfiguration = {
  collapsibleStartAtDepth: 2,
  collapsedIcon: '▶',
  expandedIcon: '▼',
  listIdPrefix: 'description-',
}

