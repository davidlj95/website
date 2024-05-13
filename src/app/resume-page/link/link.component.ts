import { Component, Input } from '@angular/core'
import { NgIf, NgTemplateOutlet } from '@angular/common'

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  standalone: true,
  imports: [NgIf, NgTemplateOutlet],
})
export class LinkComponent {
  @Input({ required: true }) public href?: string
}
