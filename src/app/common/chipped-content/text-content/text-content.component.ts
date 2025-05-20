import { Component, input } from '@angular/core'

@Component({
  selector: 'app-text-content',
  template: '{{ text() }}',
})
export class TextContentComponent {
  readonly text = input.required<string>()
}
