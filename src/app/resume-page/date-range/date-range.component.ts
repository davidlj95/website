import { Component, Input } from '@angular/core'
import { DateRange } from './date-range'
import { DatePipe, NgIf } from '@angular/common'

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  imports: [NgIf, DatePipe],
})
export class DateRangeComponent {
  @Input({ required: true }) public range!: DateRange
}
