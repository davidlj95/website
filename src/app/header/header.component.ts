import { Component } from '@angular/core'
import { DarkTheme, LightTheme } from '../material-symbols'
import { ColorSchemeService } from './color-scheme.service'
import { MaterialSymbolDirective } from '@common/material-symbol.directive'
import { DISPLAY_NONE_IF_NO_SCRIPT_CLASS } from '@common/no-script'
import { NgClass } from '@angular/common'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [MaterialSymbolDirective, NgClass],
})
export class HeaderComponent {
  protected readonly MaterialSymbol = {
    DarkTheme,
    LightTheme,
  }

  constructor(protected readonly colorSchemeService: ColorSchemeService) {}

  protected readonly DISPLAY_NONE_IF_NO_SCRIPT_CLASS =
    DISPLAY_NONE_IF_NO_SCRIPT_CLASS
}
