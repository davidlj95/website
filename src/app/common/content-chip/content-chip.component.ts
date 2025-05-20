import { Component } from '@angular/core'

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'li[appContentChip]',
  template: '<ng-content></ng-content>',
  styleUrl: './content-chip.component.scss',
})
export class ContentChipComponent {}
