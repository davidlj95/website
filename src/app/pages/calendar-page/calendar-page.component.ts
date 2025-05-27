import { Component } from '@angular/core'
import { MaterialSymbolDirective } from '@/common/material-symbol.directive'
import { Event } from '@/data/material-symbols'

@Component({
  templateUrl: './calendar-page.component.html',
  styleUrl: './calendar-page.component.scss',
  imports: [MaterialSymbolDirective],
})
export class CalendarPageComponent {
  protected readonly _materialSymbols = { Event }
}
