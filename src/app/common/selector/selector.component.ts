import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core'

@Component({
  selector: 'app-selector',
  imports: [],
  templateUrl: './selector.component.html',
  styleUrl: './selector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectorComponent<Value extends string = string> {
  readonly label = input.required<string>()
  readonly name = input<string>()
  readonly options = input.required<readonly SelectorOption<Value>[]>()
  readonly selected = input<Value>()
  readonly selectedChange = output<Value>()

  onChange(event: Event): void {
    this.selectedChange.emit((event.target as HTMLSelectElement).value as Value)
  }
}

export interface SelectorOption<Value extends string = string> {
  name: string
  value: Value
}
