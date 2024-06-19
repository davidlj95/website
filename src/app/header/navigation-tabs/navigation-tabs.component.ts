import {
  afterRender,
  AfterRenderPhase,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  QueryList,
  ViewChildren,
} from '@angular/core'
import { TabComponent } from '../tab/tab.component'
import { TabsComponent } from '../tabs/tabs.component'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { ToolbarButtonComponent } from '../toolbar-button/toolbar-button.component'

@Component({
  selector: 'app-navigation-tabs',
  standalone: true,
  imports: [
    TabsComponent,
    TabComponent,
    RouterLink,
    RouterLinkActive,
    ToolbarButtonComponent,
  ],
  templateUrl: './navigation-tabs.component.html',
  styleUrl: './navigation-tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationTabsComponent {
  @Input({ required: true })
  items!: ReadonlyArray<NavigationItem>

  // 👇 Scroll to active tab
  @ViewChildren(TabComponent, { read: ElementRef })
  private _tabsElRefs!: QueryList<ElementRef>
  private _scrollToIndex: number | undefined

  constructor() {
    afterRender(
      () => {
        // 👇 Can't be done when active route changed, as at that moment
        //    the tab element will be updated with the `active` styling.
        //    We need to wait for that to happen or scrolling won't work if element gets updated whilst scrolling.
        this._scrollIfNeeded()
      },
      { phase: AfterRenderPhase.Read },
    )
  }

  onActiveRouteChange(index: number) {
    this._scrollToIndex = index
  }

  private _scrollIfNeeded() {
    if (this._scrollToIndex === undefined || !this._tabsElRefs) {
      return
    }
    const tabElement = this._tabsElRefs.get(this._scrollToIndex)
    ;(tabElement?.nativeElement as HTMLElement).scrollIntoView({
      behavior: 'smooth',
    })
    this._scrollToIndex = undefined
  }
}

export interface NavigationItem {
  readonly displayName: string
  readonly routerLink: typeof RouterLink.prototype.routerLink
}
