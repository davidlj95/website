import { Component } from '@angular/core'
import { Warning } from '../material-symbols'
import { MaterialSymbolDirective } from '../common/material-symbol.directive'

@Component({
  selector: 'app-no-script',
  templateUrl: './no-script.component.html',
  styleUrls: ['./no-script.component.scss'],
  standalone: true,
  imports: [MaterialSymbolDirective],
})
export class NoScriptComponent {
  protected readonly MaterialSymbol = {
    Warning,
  }
}
