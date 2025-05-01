import { Component } from '@angular/core'
import { Warning } from '@/data/material-symbols'
import { MaterialSymbolDirective } from '@/common/material-symbol.directive'

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'noscript[appNoJsMessage]',
  templateUrl: './no-js-message.component.html',
  styleUrls: ['./no-js-message.component.scss'],
  imports: [MaterialSymbolDirective],
  host: { ngSkipHydration: 'true' },
})
export class NoJsMessageComponent {
  protected readonly _materialSymbol = {
    Warning,
  }
}
