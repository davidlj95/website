import { Component } from '@angular/core'
import { DarkTheme, LightTheme } from '../material-symbols'
import { ColorSchemeService } from './color-scheme.service'
import { MaterialSymbolDirective } from '../common/material-symbol.directive'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [MaterialSymbolDirective],
})
export class HeaderComponent {
  protected readonly MaterialSymbol = {
    DarkTheme,
    LightTheme,
  }

  constructor(protected readonly colorSchemeService: ColorSchemeService) {}
}
