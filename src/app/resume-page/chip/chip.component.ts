import { Component, EventEmitter, input, Output } from '@angular/core'

@Component({
  selector: 'app-chip',
  template: '<ng-content></ng-content>',
  styleUrls: ['./chip.component.scss'],
  standalone: true,
  host: {
    '[class.selected]': 'selected()',
    '[class.selectable]': 'selectedChange.observed',
    '[attr.role]': "selectedChange.observed ? 'button': undefined",
    '[attr.tabindex]': "selectedChange.observed ? '0': undefined",
    '(click)': 'emitToggledSelected()',
    '(keydown.enter)': 'emitToggledSelected()',
    '(keydown.space)': 'emitToggledSelected()',
  },
})
export class ChipComponent {
  readonly selected = input<boolean>()

  @Output()
  selectedChange = new EventEmitter<boolean>()

  protected emitToggledSelected() {
    this.selectedChange.emit(!this.selected())
  }
}
