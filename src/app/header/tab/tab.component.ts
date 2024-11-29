import { Component, ElementRef, Input } from '@angular/core'

@Component({
  selector: 'app-tab',
  template: '<ng-content></ng-content>',
  styleUrls: ['./tab.component.scss'],
  host: {
    role: 'tab',
    '[attr.aria-selected]': 'isSelected',
    '[attr.tabindex]': 'isSelected ? 0 : -1',
  },
})
export class TabComponent {
  // Can't be migrated yet: https://github.com/davidlj95/website/pull/886
  @Input() isSelected = false

  constructor(
    /**
     * 👇 Useful for {@link TabsComponent} to access the HTML native element.
     *
     * Same as Angular Material does for tabs pagination
     * https://github.com/angular/components/blob/18.0.5/src/material/tabs/paginated-tab-header.ts#L515
     * https://github.com/angular/components/blob/18.0.5/src/material/tabs/tab-label-wrapper.ts#L29
     */
    readonly elRef: ElementRef<Element>,
  ) {}
}
