import { Component } from '@angular/core'
import { Warning } from '../material-symbols'

@Component({
  selector: 'app-no-script',
  templateUrl: './no-script.component.html',
  styleUrls: ['./no-script.component.scss'],
})
export class NoScriptComponent {
  protected readonly MaterialSymbol = {
    Warning,
  }
}
