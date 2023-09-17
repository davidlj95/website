import { Component, HostBinding } from '@angular/core';
import { ColorSchemeService } from './color-scheme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @HostBinding('attr.role') ariaRole = 'toolbar';
  public Icons = {
    DarkTheme: '\ue51c',
    LightTheme: '\ue518',
  };

  constructor(
    protected colorSchemeService: ColorSchemeService,
  ) {
  }
}
