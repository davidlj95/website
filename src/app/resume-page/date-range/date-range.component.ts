import { Component, Input } from '@angular/core'
import { DateRange } from './date-range'

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss'],
})
export class DateRangeComponent {
  @Input({ required: true }) public range!: DateRange
}
