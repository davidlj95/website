import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { TabComponent } from '../tab/tab.component'
import { TabsComponent } from '../tabs/tabs.component'
import { RouterLink, RouterLinkActive } from '@angular/router'

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'nav[appNavigationTabs]',
  imports: [TabsComponent, TabComponent, RouterLink, RouterLinkActive],
  templateUrl: './navigation-tabs.component.html',
  styleUrl: './navigation-tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationTabsComponent {
  readonly items = input.required<readonly NavigationItem[]>()
  protected _selectedIndex?: number

  onActiveRouteChange(index: number) {
    this._selectedIndex = index
  }
}

export interface NavigationItem {
  readonly displayName: string
  readonly routerLink: typeof RouterLink.prototype.routerLink
}
