import { Component } from '@angular/core';
import { TabId } from "../navigation-tabs/navigation-tabs.component";

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss']
})
export class WindowComponent {
  public selectedTab: TabId = 'contact';
}
