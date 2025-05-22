import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: "input[type='checkbox'][appCheckbox]",
  template: '',
  styleUrl: './checkbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent {}
