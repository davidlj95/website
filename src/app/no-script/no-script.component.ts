import { Component, ViewEncapsulation } from '@angular/core';
import { Warning } from '../material-symbols';

@Component({
  selector: 'app-no-script',
  templateUrl: './no-script.component.html',
  styleUrls: ['./no-script.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NoScriptComponent {
  protected Icons = {
    Warning: Warning,
  }
}
