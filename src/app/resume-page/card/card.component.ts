import { Component } from '@angular/core'

@Component({
  selector: 'app-card',
  template: '<ng-content></ng-content>',
  styleUrls: ['./card.component.scss'],
  standalone: true,
})
export class CardComponent {}
