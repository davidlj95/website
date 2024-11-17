import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
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
