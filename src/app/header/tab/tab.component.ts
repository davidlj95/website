import { Component, ElementRef, inject, Input } from '@angular/core'

@Component({
  selector: 'app-tab',
  template: '<ng-content></ng-content>',
  styleUrls: ['./tab.component.scss'],
  standalone: true,
  host: {
    role: 'tab',
    '[attr.aria-selected]': 'selected',
    '[attr.tabindex]': 'selected ? 0 : -1',
  },
})
export class TabComponent {
  elRef = inject(ElementRef)
  @Input() selected = false
}
