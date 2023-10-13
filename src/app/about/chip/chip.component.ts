import {
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
} from '@angular/core'

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
})
export class ChipComponent {
  @HostBinding('class.selected')
  @Input()
  public selected?: boolean

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
    this.selectedChange.emit(!this.selected)
  }
}
