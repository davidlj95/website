import { Component } from '@angular/core'

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'article[appCard]',
  template: '<ng-content></ng-content>',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {}
