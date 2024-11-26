import {
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Output,
  input,
} from '@angular/core'

@Component({
  selector: 'app-chip',
  template: '<ng-content></ng-content>',
  styleUrls: ['./chip.component.scss'],
  standalone: true,
})
export class ChipComponent {
  @HostBinding('class.selected')
  public readonly selected = input<boolean>()

  @Output()
  public selectedChange = new EventEmitter<boolean>()

  @HostBinding('class.selectable')
  public get selectable() {
    return this.selectedChange.observed
  }

  @HostBinding('attr.role')
  public get ariaRole(): string | undefined {
    return this.selectable ? 'button' : undefined
  }

  @HostBinding('attr.tabindex')
  public get tabIndex(): string | undefined {
    return this.selectable ? (0).toString() : undefined
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
