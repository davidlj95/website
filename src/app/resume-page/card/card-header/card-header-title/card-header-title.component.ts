import { Component } from '@angular/core'

@Component({
  selector: 'app-card-header-title',
  template: '<ng-content></ng-content>',
  styleUrls: ['./card-header-title.component.scss'],
  standalone: true,
})
export class CardHeaderTitleComponent {}
