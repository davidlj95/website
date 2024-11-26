import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { NoScriptComponent } from './no-script/no-script.component'
import { HeaderComponent } from './header/header.component'
import { maybeLoadConsoleEasterEgg } from './maybe-load-console-easter-egg'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [HeaderComponent, NoScriptComponent, RouterOutlet],
})
export class AppComponent {
  constructor() {
    maybeLoadConsoleEasterEgg()
  }
}
