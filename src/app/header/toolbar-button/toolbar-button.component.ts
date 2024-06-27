import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { MaterialSymbolDirective } from '@/common/material-symbol.directive'

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[app-toolbar-button]',
  standalone: true,
  imports: [MaterialSymbolDirective],
  templateUrl: './toolbar-button.component.html',
  styleUrl: './toolbar-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarButtonComponent {
  @Input({ required: true }) public icon!: string
}
