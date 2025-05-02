import { Component } from '@angular/core'

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[appSectionTitle]',
  template: '<ng-content></ng-content>',
  styleUrls: ['./section-title.component.scss'],
})
export class SectionTitleComponent {}
