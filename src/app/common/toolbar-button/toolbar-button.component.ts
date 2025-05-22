import { ChangeDetectionStrategy, Component } from '@angular/core'
import { MaterialSymbolDirective } from '@/common/material-symbol.directive'

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'button[appToolbarButton],a[appToolbarButton]',
  template: '<ng-content></ng-content>',
  styleUrl: './toolbar-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [MaterialSymbolDirective],
})
export class ToolbarButtonComponent {
  // https://github.com/angular/components/blob/18.0.5/src/material/button/button-base.ts#L257-L266
  // https://github.com/angular/components/blob/18.0.5/src/material/button/button-base.ts#L257-L266
}
