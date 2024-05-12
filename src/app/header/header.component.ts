import { Component } from '@angular/core'
import { LightDarkToggleComponent } from './light-dark-toggle/light-dark-toggle.component'
import { NgClass } from '@angular/common'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [NgClass, LightDarkToggleComponent],
})
export class HeaderComponent {}
