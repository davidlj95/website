import { Component, HostBinding } from '@angular/core';
import { ColorSchemeService } from './color-scheme.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @HostBinding('attr.role') ariaRole = 'toolbar';

  constructor(
    public colorSchemeService: ColorSchemeService,
  ) {
  }
}
