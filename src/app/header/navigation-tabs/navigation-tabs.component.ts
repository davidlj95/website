import { Component, Input } from '@angular/core'
import { TabComponent } from '../tab/tab.component'
import { TabsComponent } from '../tabs/tabs.component'
import { RouterLink, RouterLinkActive } from '@angular/router'

@Component({
  selector: 'app-navigation-tabs',
  standalone: true,
  imports: [TabsComponent, TabComponent, RouterLink, RouterLinkActive],
  templateUrl: './navigation-tabs.component.html',
  styleUrl: './navigation-tabs.component.scss',
})
export class NavigationTabsComponent {
  @Input({ required: true }) items!: ReadonlyArray<NavigationItem>
}

export interface NavigationItem {
  readonly displayName: string
  readonly routerLink: typeof RouterLink.prototype.routerLink
}
