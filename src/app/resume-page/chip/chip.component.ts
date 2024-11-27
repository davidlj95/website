import {
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  input,
  Output,
} from '@angular/core'

@Component({
  selector: 'app-chip',
  template: '<ng-content></ng-content>',
  styleUrls: ['./chip.component.scss'],
  standalone: true,
  host: { '[class.selected]': 'selected()' },
})
export class ChipComponent {
  readonly selected = input<boolean>()

  @Output()
  selectedChange = new EventEmitter<boolean>()

  @HostBinding('class.selectable')
  get isSelectable() {
    return this.selectedChange.observed
  }

  @HostBinding('attr.role')
  get ariaRole(): string | undefined {
    return this.isSelectable ? 'button' : undefined
  }

  @HostBinding('attr.tabindex')
  get tabIndex(): string | undefined {
    return this.isSelectable ? (0).toString() : undefined
  }

  @HostListener('click') protected onClick() {
    this.emitToggledSelected()
  }

  @HostListener('keydown.space') protected onKeydownSpace() {
    this.emitToggledSelected()
  }

  @HostListener('keydown.enter') protected onKeydownEnter() {
    this.emitToggledSelected()
  }

  private emitToggledSelected() {
    this.selectedChange.emit(!this.selected())
  }
}
