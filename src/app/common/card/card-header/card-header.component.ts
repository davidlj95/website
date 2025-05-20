import { Component } from '@angular/core'

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'header[appCardHeader]',
  template: '<ng-content></ng-content>',
  styleUrls: ['./card-header.component.scss'],
})
export class CardHeaderComponent {}
