import { Component } from '@angular/core'
import { DarkMode, LightMode } from '@/data/material-symbols'
import { ColorSchemeService } from './color-scheme.service'
import { ToolbarButtonComponent } from '../toolbar-button/toolbar-button.component'

@Component({
  selector: 'app-light-dark-toggle',
  imports: [ToolbarButtonComponent],
  templateUrl: './light-dark-toggle.component.html',
  styleUrl: './light-dark-toggle.component.scss',
})
export class LightDarkToggleComponent {
  protected readonly _materialSymbol = {
    DarkMode,
    LightMode,
  }

  constructor(protected readonly _colorSchemeService: ColorSchemeService) {}
}
