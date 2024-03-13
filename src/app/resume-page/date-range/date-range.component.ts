import { Component, Input } from '@angular/core'
import { DateRange } from './date-range'
import { NgIf, DatePipe } from '@angular/common'

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss'],
  standalone: true,
  imports: [NgIf, DatePipe],
})
export class DateRangeComponent {
  @Input({ required: true }) public range!: DateRange
}
