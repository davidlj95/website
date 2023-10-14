import { Component } from '@angular/core'
import { DarkTheme, LightTheme } from '../material-symbols'
import { ColorSchemeService } from './color-scheme.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  protected readonly MaterialSymbol = {
    DarkTheme,
    LightTheme,
  }

  constructor(protected readonly colorSchemeService: ColorSchemeService) {}
}
