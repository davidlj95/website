import { Component, input } from '@angular/core'
import { DateRange } from './date-range'
import { DatePipe, NgTemplateOutlet } from '@angular/common'

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  imports: [DatePipe, NgTemplateOutlet],
})
export class DateRangeComponent {
  readonly range = input.required<DateRange>()
  protected readonly _now = new Date()
}
