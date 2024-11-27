import { Component, input } from '@angular/core'
import { NgTemplateOutlet } from '@angular/common'

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  imports: [NgTemplateOutlet],
})
export class LinkComponent {
  readonly href = input.required<string | undefined>()
}
