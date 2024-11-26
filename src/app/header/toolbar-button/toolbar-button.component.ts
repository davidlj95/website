import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { MaterialSymbolDirective } from '@/common/material-symbol.directive'

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[app-toolbar-button]',
  imports: [MaterialSymbolDirective],
  templateUrl: './toolbar-button.component.html',
  styleUrl: './toolbar-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarButtonComponent {
  @Input({ required: true }) icon!: string
  // https://github.com/angular/components/blob/18.0.5/src/material/button/button-base.ts#L257-L266
}
