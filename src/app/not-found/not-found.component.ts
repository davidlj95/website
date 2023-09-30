import { Component } from '@angular/core'
import { Lightbulb } from '../material-symbols'
import { MATERIAL_SYMBOLS_CLASS } from '../common/material-symbols'

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent {
  protected readonly MATERIAL_SYMBOLS_CLASS = MATERIAL_SYMBOLS_CLASS
  protected readonly MaterialSymbol = {
    Lightbulb,
  }
}
