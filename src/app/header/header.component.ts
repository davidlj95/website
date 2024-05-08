import { Component } from '@angular/core'
import { DISPLAY_NONE_IF_NO_SCRIPT_CLASS } from '@/common/no-script'
import { LightDarkToggleComponent } from './light-dark-toggle/light-dark-toggle.component'
import { NgClass } from '@angular/common'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [NgClass, LightDarkToggleComponent],
})
export class HeaderComponent {
  protected readonly DISPLAY_NONE_IF_NO_SCRIPT_CLASS =
    DISPLAY_NONE_IF_NO_SCRIPT_CLASS
}
