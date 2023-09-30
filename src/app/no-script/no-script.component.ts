import { Component } from '@angular/core'
import { Warning } from '../material-symbols'
import { MATERIAL_SYMBOLS_CLASS } from '../common/material-symbols'

@Component({
  selector: 'app-no-script',
  templateUrl: './no-script.component.html',
  styleUrls: ['./no-script.component.scss'],
})
export class NoScriptComponent {
  protected readonly MATERIAL_SYMBOLS_CLASS = MATERIAL_SYMBOLS_CLASS
  protected readonly MaterialSymbol = {
    Warning,
  }
}
