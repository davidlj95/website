import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-text-content',
  standalone: true,
  imports: [],
  template: '{{ text }}',
})
export class TextContentComponent {
  @Input() text?: string
}
