import { Component } from '@angular/core'

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'button[app-button]',
  template: '<ng-content></ng-content>',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {}
