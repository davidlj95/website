import {
  afterRender,
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

  @ViewChildren(TabComponent, { read: ElementRef })
  private _tabElements!: QueryList<ElementRef>
  private _scrollToIndex: number | undefined

  constructor() {
    // 👇 Can't be done when active route changed, as at that moment
    //    the tab element will be updated with the `active` styling.
    //    We need to wait for that to happen or scrolling won't work if element gets updated whilst scrolling.
    afterRender(() => {
      if (this._scrollToIndex === undefined) {
        return
      }
      const tabElement = this._tabElements.get(this._scrollToIndex)
      ;(tabElement?.nativeElement as HTMLElement).scrollIntoView({
        behavior: 'smooth',
      })
      this._scrollToIndex = undefined
    })
  }

  onActiveRouteChange(index: number) {
    if (this._scrollToIndex === index) {
      return
    }
    this._scrollToIndex = index
  }
}

export interface NavigationItem {
  readonly displayName: string
  readonly routerLink: typeof RouterLink.prototype.routerLink
}
