import { Component } from '@angular/core'

@Component({
  selector: 'app-content-page, article[appContentPage]',
  imports: [],
  template: '<ng-content></ng-content>',
  styleUrl: './content-page.component.scss',
})
export class ContentPageComponent {}
