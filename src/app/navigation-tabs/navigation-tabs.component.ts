import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navigation-tabs',
  templateUrl: './navigation-tabs.component.html',
  styleUrls: ['./navigation-tabs.component.scss']
})
export class NavigationTabsComponent {
  public static readonly IDS = ['contact', 'social-media', 'cv'] as const;
  readonly items: ReadonlyArray<TabItem> = [
    {
      id: 'contact',
      displayName: 'Contact',
    },
    {
      id: 'social-media',
      displayName: 'Social media',
    },
    {
      id: 'cv',
      displayName: 'CV',
      externalUrl: 'https://resume.davidlj95.com',
    }
  ] as const;

  @Input({required: true}) tab!: TabId;
}

interface TabItem {
  id: TabId;
  displayName: string;
  externalUrl?: string;
}

export type TabId = typeof NavigationTabsComponent.IDS[number];

export function isTabId(id: string): id is TabId {
  return NavigationTabsComponent.IDS.includes(id as TabId);
}
