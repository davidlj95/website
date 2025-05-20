import { Component } from '@angular/core'

@Component({
  selector: 'app-toolbar',
  imports: [],
  template: '<ng-content></ng-content>',
  styleUrl: './toolbar.component.scss',
  host: {
    role: 'toolbar',
  },
})
export class ToolbarComponent {}
