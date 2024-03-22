import { Component } from '@angular/core'

@Component({
  selector: 'app-content-chip',
  standalone: true,
  imports: [],
  template: '<ng-content></ng-content>',
  styleUrl: './content-chip.component.scss',
})
export class ContentChipComponent {}
