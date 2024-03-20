import { Component } from '@angular/core'

@Component({
  selector: 'app-card-grid',
  standalone: true,
  imports: [],
  template: `<ng-content></ng-content>`,
  styleUrl: './card-grid.component.scss',
})
export class CardGridComponent {}
