import { Component, Inject, Input } from '@angular/core';
import { isSomeEnum } from '../../utils';
import { METADATA } from '../common/injection-tokens';
import { Metadata } from '../metadata';

@Component({
  selector: 'app-navigation-tabs',
  templateUrl: './navigation-tabs.component.html',
  styleUrls: ['./navigation-tabs.component.scss']
})
export class NavigationTabsComponent {
  readonly items: ReadonlyArray<TabItem> = [
    {
      id: TabId.Contact,
      displayName: 'Contact',
    },
    {
      id: TabId.Social,
      displayName: 'Social media',
    },
    {
      id: TabId.CV,
      displayName: 'CV',
      externalUrl: `https://resume.${this.metadata.domainName}`,
    }
  ] as const;

  @Input({required: true}) tab!: TabId;

  constructor(
    @Inject(METADATA) private metadata: Metadata,
  ) {
  }
}

interface TabItem {
  id: TabId;
  displayName: string;
  externalUrl?: string;
}

export enum TabId {
  Contact = 'contact',
  Social = 'social',
  CV = 'cv',
}

export const isTabId: (id: string) => id is TabId = isSomeEnum(TabId);
