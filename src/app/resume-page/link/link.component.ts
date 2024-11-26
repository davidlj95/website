import { Component, Input } from '@angular/core'
import { NgTemplateOutlet } from '@angular/common'

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  imports: [NgTemplateOutlet],
})
export class LinkComponent {
  @Input({ required: true }) public href?: string
}
