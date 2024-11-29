import { Component, EventEmitter, input, Output } from '@angular/core'

@Component({
  selector: 'app-chip',
  template: '<ng-content></ng-content>',
  styleUrls: ['./chip.component.scss'],
  host: {
    '[class.selected]': 'isSelected()',
    '[class.selectable]': 'isSelectedChange.observed',
    '[attr.role]': "isSelectedChange.observed ? 'button': undefined",
    '[attr.tabindex]': 'isSelectedChange.observed ? 0 : undefined',
    '(click)': 'emitToggledSelected()',
    '(keydown.enter)': 'emitToggledSelected()',
    '(keydown.space)': 'emitToggledSelected()',
  },
})
export class ChipComponent {
  readonly isSelected = input<boolean>()

  @Output()
  isSelectedChange = new EventEmitter<boolean>()

  protected emitToggledSelected() {
    this.isSelectedChange.emit(!this.isSelected())
  }
}
