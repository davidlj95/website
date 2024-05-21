import { Component } from '@angular/core'
import { NavigationTabsComponent } from './navigation-tabs/navigation-tabs.component'
import { ToolbarComponent } from './toolbar/toolbar.component'
import { LightDarkToggleComponent } from './light-dark-toggle/light-dark-toggle.component'
import { NAVIGATION_ITEMS } from './navigation-items'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    NavigationTabsComponent,
    ToolbarComponent,
    LightDarkToggleComponent,
  ],
})
export class HeaderComponent {
  protected readonly _navigationItems = NAVIGATION_ITEMS
}
