import { Component } from '@angular/core'
import { MaterialSymbolDirective } from '@/common/material-symbol.directive'
import { DarkMode, LightMode } from '../../material-symbols'
import { ColorSchemeService } from './color-scheme.service'

@Component({
  selector: 'app-light-dark-toggle',
  standalone: true,
  imports: [MaterialSymbolDirective],
  templateUrl: './light-dark-toggle.component.html',
  styleUrl: './light-dark-toggle.component.scss',
})
export class LightDarkToggleComponent {
  protected readonly MaterialSymbol = {
    DarkMode,
    LightMode,
  }

  constructor(protected readonly colorSchemeService: ColorSchemeService) {}
}