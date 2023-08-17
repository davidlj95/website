import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { isTabId, TabId } from "../navigation-tabs/navigation-tabs.component";

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss']
})
export class WindowComponent implements OnDestroy {
  static readonly DEFAULT_TAB_ID: TabId = 'contact';

  public selectedTab: TabId = WindowComponent.DEFAULT_TAB_ID;
  private fragmentSubscription = this.activatedRoute.fragment.subscribe(
    (fragment) => {
      if (fragment && isTabId(fragment)) {
        this.selectedTab = fragment;
      }
    }
  );

  constructor(
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnDestroy(): void {
    this.fragmentSubscription.unsubscribe();
  }
}
