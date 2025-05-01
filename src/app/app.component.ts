import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { HeaderComponent } from './header/header.component'
import { maybeLoadConsoleEasterEgg } from './console-easter-egg/maybe-load-console-easter-egg'
import { BackgroundComponent } from './background/background.component'
import { NoJsMessageComponent } from './no-js/no-js-message.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    HeaderComponent,
    NoJsMessageComponent,
    RouterOutlet,
    BackgroundComponent,
  ],
})
export class AppComponent {
  constructor() {
    maybeLoadConsoleEasterEgg()
  }
}
