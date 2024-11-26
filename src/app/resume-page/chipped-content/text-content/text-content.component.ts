import { Component, input } from '@angular/core'

@Component({
  selector: 'app-text-content',
  imports: [],
  template: '{{ text() }}',
})
export class TextContentComponent {
  readonly text = input<string>()
}
