import { Component } from '@angular/core'
import { LightDarkToggleComponent } from './light-dark-toggle/light-dark-toggle.component'
import { NgClass } from '@angular/common'
import { ToolbarComponent } from './toolbar/toolbar.component'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [NgClass, LightDarkToggleComponent, ToolbarComponent],
})
export class HeaderComponent {}
