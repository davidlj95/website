import { Component } from '@angular/core'

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ul[appContentChipList]',
  template: '<ng-content></ng-content>',
  styleUrl: './content-chip-list.component.scss',
})
export class ContentChipListComponent {}
