import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core'
import { TechTag } from '../tags' // Assuming '@/data/tags' is the correct path

@Component({
  selector: 'app-tech-tags-selector',
  templateUrl: './tech-tags-selector.component.html',
  styleUrl: './tech-tags-selector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechTagsSelectorComponent {
  available = input.required<readonly TechTag[]>()
  selected = input<readonly TechTag[]>([])
  selectedChange = output<readonly TechTag[]>()

  selectTag(tag: TechTag): void {
    if (this.isSelected(tag)) return
    this.selectedChange.emit([...this.selected(), tag])
  }

  unselectTag(tag: TechTag): void {
    const index = this.selected().findIndex((t) => t.char === tag.char)
    if (index === -1) return
    const selected = [...this.selected()]
    selected.splice(index, 1)
    this.selectedChange.emit(selected) // Emit the intended new selection
  }

  isSelected(tag: TechTag): boolean {
    return this.selected().some((t) => t.char === tag.char)
  }
}
