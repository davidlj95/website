import { Component } from '@angular/core'
import { NavigationTabsComponent } from './navigation-tabs/navigation-tabs.component'
import { ToolbarComponent } from './toolbar/toolbar.component'
import { LightDarkToggleComponent } from './light-dark-toggle/light-dark-toggle.component'
import { NAVIGATION_ITEMS } from './navigation-items'
import { ToolbarDividerComponent } from './toolbar-divider/toolbar-divider.component'

@Component({
  //👇 Semantic HTML ftw, sorry Angular guidelines
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    NavigationTabsComponent,
    ToolbarComponent,
    LightDarkToggleComponent,
    ToolbarDividerComponent,
  ],
})
export class HeaderComponent {
  protected readonly _navigationItems = NAVIGATION_ITEMS
}
