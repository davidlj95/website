import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { MaterialSymbolDirective } from '@/common/material-symbol.directive'

@Component({
  selector: 'app-toolbar-icon',
  standalone: true,
  imports: [MaterialSymbolDirective],
  templateUrl: './toolbar-icon.component.html',
  styleUrl: './toolbar-icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarIconComponent {
  @Input({ required: true }) public icon!: string
  @Input({ required: true }) public ariaLabel!: string
}
