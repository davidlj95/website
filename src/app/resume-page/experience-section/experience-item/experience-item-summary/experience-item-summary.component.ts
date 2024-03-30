import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-experience-item-summary',
  template: '{{ summary }}',
  styles: [
    `
      :host {
        overflow: hidden;
      }
    `,
  ],
  standalone: true,
})
export class ExperienceItemSummaryComponent {
  @Input({ required: true })
  public summary!: string
}
