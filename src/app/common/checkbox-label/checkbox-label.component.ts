import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'label[appCheckboxLabel]',
  template: '<ng-content></ng-content>',
  styleUrl: './checkbox-label.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxLabelComponent {}
