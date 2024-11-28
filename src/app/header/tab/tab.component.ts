import { Component, ElementRef, input } from '@angular/core'

@Component({
  selector: 'app-tab',
  template: '<ng-content></ng-content>',
  styleUrls: ['./tab.component.scss'],
  standalone: true,
  host: {
    role: 'tab',
    '[attr.aria-selected]': 'isSelected()',
    '[attr.tabindex]': 'isSelected() ? 0 : -1',
  },
})
export class TabComponent {
  readonly isSelected = input(false)

  constructor(
    //👇 Useful for tabs group component to access the HTML native element
    //   Same as Angular Material does for tabs pagination
    //   https://github.com/angular/components/blob/18.0.5/src/material/tabs/paginated-tab-header.ts#L515
    //   https://github.com/angular/components/blob/18.0.5/src/material/tabs/tab-label-wrapper.ts#L29
    readonly elRef: ElementRef,
  ) {}
}
