import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-experience-item-summary',
  template: '{{ summary }}',
})
export class ExperienceItemSummaryComponent {
  @Input({ required: true }) public summary!: string
}
