import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { TabComponent } from '../tab/tab.component'
import { TabsComponent } from '../tabs/tabs.component'
import { RouterLink, RouterLinkActive } from '@angular/router'

@Component({
  selector: 'app-navigation-tabs',
  imports: [TabsComponent, TabComponent, RouterLink, RouterLinkActive],
  templateUrl: './navigation-tabs.component.html',
  styleUrl: './navigation-tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationTabsComponent {
  @Input({ required: true }) items!: readonly NavigationItem[]
  protected _selectedIndex?: number

  onActiveRouteChange(index: number) {
    this._selectedIndex = index
  }
}

export interface NavigationItem {
  readonly displayName: string
  readonly routerLink: typeof RouterLink.prototype.routerLink
}
