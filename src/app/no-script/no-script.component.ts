import { Component } from '@angular/core'
import { Warning } from '@/data/material-symbols'
import { MaterialSymbolDirective } from '@/common/material-symbol.directive'

@Component({
  selector: 'app-no-script',
  templateUrl: './no-script.component.html',
  styleUrls: ['./no-script.component.scss'],
  standalone: true,
  imports: [MaterialSymbolDirective],
  host: { ngSkipHydration: 'true' },
})
export class NoScriptComponent {
  protected readonly MaterialSymbol = {
    Warning,
  }
}
