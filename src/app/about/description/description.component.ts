import { animate, AUTO_STYLE, state, style, transition, trigger } from '@angular/animations';
import { isPlatformBrowser } from '@angular/common';
import { Component, HostBinding, Inject, InjectionToken, Input, PLATFORM_ID } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { EMPHASIZED_DURATION_MS, TIMING_FUNCTION } from '../../common/animations';
import { DescriptionLine } from '../../metadata';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss'],
  animations: [
    trigger('expanded', [
      state('true', style({height: AUTO_STYLE, visibility: AUTO_STYLE})),
      state('false', style({height: '0', visibility: 'hidden'})),
      transition('true => false', animate(`${EMPHASIZED_DURATION_MS}ms ${TIMING_FUNCTION}`)),
      transition('false => true', animate(`${EMPHASIZED_DURATION_MS}ms ${TIMING_FUNCTION}`)),
    ]),
  ],
})
export class DescriptionComponent {
  @Input({required: true}) public line!: DescriptionLine
  @Input() public depth: number = 0
  @HostBinding('class.showIfNoScript') private showIfNoScript = true
  @HostBinding('class.hidden') private hidden = true

  private EXPANDED_DEFAULT_NO_JS = true
  private EXPANDED_DEFAULT_JS_ENABLED = false
  public isExpanded = this.EXPANDED_DEFAULT_NO_JS

  constructor(
    protected sanitizer: DomSanitizer,
    @Inject(COLLAPSIBLE_CONFIG) protected config: CollapsibleConfiguration,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {
    if(isPlatformBrowser(this.platformId)) {
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

