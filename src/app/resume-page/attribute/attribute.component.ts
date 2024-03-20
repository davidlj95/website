import { Component, Input } from '@angular/core'
import { MaterialSymbolDirective } from '@common/material-symbol.directive'

@Component({
  selector: 'app-attribute',
  templateUrl: './attribute.component.html',
  styleUrls: ['./attribute.component.scss'],
  standalone: true,
  imports: [MaterialSymbolDirective],
})
export class AttributeComponent {
  @Input({ required: true }) symbol!: string
  @Input({ required: true }) id!: string

  public get tooltipId() {
    return `${this.id}-tooltip`
  }
}
