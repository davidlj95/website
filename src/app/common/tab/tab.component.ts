import { Component, ElementRef, Input, inject } from '@angular/core'

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'a[appTab]',
  template: '<ng-content></ng-content>',
  styleUrls: ['./tab.component.scss'],
  host: {
    role: 'tab',
    '[attr.aria-selected]': 'isSelected',
    '[attr.tabindex]': 'isSelected ? 0 : -1',
  },
})
export class TabComponent {
  readonly elRef = inject<ElementRef<Element>>(ElementRef)

  // Can't be migrated yet: https://github.com/davidlj95/website/pull/886
  @Input() isSelected = false
}
