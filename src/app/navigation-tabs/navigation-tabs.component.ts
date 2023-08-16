import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-navigation-tabs',
  templateUrl: './navigation-tabs.component.html',
  styleUrls: ['./navigation-tabs.component.scss']
})
export class NavigationTabsComponent {
  public items: ReadonlyArray<TabItem> = [
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
  ];

  @Input({required: true}) tab!: TabId;
  @Output() tabChange = new EventEmitter<TabId>();

  onTabTap(id: TabId) {
    this.tabChange.emit(id);
  }
}

interface TabItem {
  id: TabId;
  displayName: string;
  externalUrl?: string;
}

export type TabId = 'contact' | 'social-media' | 'cv';
