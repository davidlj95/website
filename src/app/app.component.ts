import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { NoScriptComponent } from './no-script/no-script.component'
import { HeaderComponent } from './header/header.component'
import { ReleaseInfoComponent } from './release-info/release-info.component'
import { maybeLoadConsoleEasterEgg } from './maybe-load-console-easter-egg'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    ReleaseInfoComponent,
    HeaderComponent,
    NoScriptComponent,
    RouterOutlet,
  ],
})
export class AppComponent {
  constructor() {
    maybeLoadConsoleEasterEgg()
  }
}
