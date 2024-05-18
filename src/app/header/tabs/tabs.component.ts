import { Component } from '@angular/core'

@Component({
  selector: 'app-tabs',
  standalone: true,
  template: '<ng-content></ng-content>',
  styleUrl: './tabs.component.scss',
  host: {
    role: 'tablist',
  },
})
export class TabsComponent {}
