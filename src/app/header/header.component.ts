import { Component } from '@angular/core'
import { NavigationTabsComponent } from './navigation-tabs/navigation-tabs.component'
import { ToolbarComponent } from './toolbar/toolbar.component'
import { LightDarkToggleComponent } from './light-dark-toggle/light-dark-toggle.component'

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
export class HeaderComponent {}
