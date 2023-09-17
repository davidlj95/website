import { Component, HostBinding } from '@angular/core';
import { DarkTheme, LightTheme } from '../material-symbols';
import { ColorSchemeService } from './color-scheme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @HostBinding('attr.role') ariaRole = 'toolbar';
  public Icons = {
    DarkTheme: DarkTheme,
    LightTheme: LightTheme,
  };

  constructor(
    protected colorSchemeService: ColorSchemeService,
  ) {
  }
}
