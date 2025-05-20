import { Component } from '@angular/core'
import { ToolbarComponent } from '../../../header/toolbar/toolbar.component'

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[appSectionTitle]',
  template: '<app-toolbar><ng-content></ng-content></app-toolbar>',
  styleUrls: ['./section-title.component.scss'],
  imports: [ToolbarComponent],
})
export class SectionTitleComponent {}
