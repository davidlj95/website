import { Component, Input } from '@angular/core'
import { TabComponent } from '../tab/tab.component'
import { TabsComponent } from '../tabs/tabs.component'
import { RouterLink, RouterLinkActive } from '@angular/router'
import {
  CALENDAR_PATH,
  GIFTS_PATH,
  RESUME_PATH,
  SPORTS_PATH,
} from '../../app.paths'

@Component({
  selector: 'app-navigation-tabs',
  standalone: true,
  imports: [TabsComponent, TabComponent, RouterLink, RouterLinkActive],
  templateUrl: './navigation-tabs.component.html',
  styleUrl: './navigation-tabs.component.scss',
})
export class NavigationTabsComponent {
  @Input() items: ReadonlyArray<NavigationItem> = NAVIGATION_ITEMS
}

export const NAVIGATION_ITEMS: ReadonlyArray<NavigationItem> = [
  { displayName: 'Resume', routerLink: RESUME_PATH },
  { displayName: 'Calendar', routerLink: CALENDAR_PATH },
  { displayName: 'Sports', routerLink: SPORTS_PATH },
  { displayName: 'Gifts', routerLink: GIFTS_PATH },
].filter((_, index) => index < 2)
// TODO: What to do when doesn't fit screen

export interface NavigationItem {
  readonly displayName: string
  readonly routerLink: typeof RouterLink.prototype.routerLink
}
