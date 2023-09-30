import { Component } from '@angular/core'
import { DarkTheme, LightTheme } from '../material-symbols'
import { ColorSchemeService } from './color-scheme.service'
import { MATERIAL_SYMBOLS_CLASS } from '../common/material-symbols'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  protected readonly MATERIAL_SYMBOLS_CLASS = MATERIAL_SYMBOLS_CLASS
  protected readonly MaterialSymbol = {
    DarkTheme,
    LightTheme,
  }

  constructor(protected readonly colorSchemeService: ColorSchemeService) {}
}
