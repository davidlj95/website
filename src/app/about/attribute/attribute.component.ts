import { Component, Input } from '@angular/core'
import { MATERIAL_SYMBOLS_CLASS } from '../../common/material-symbols'

@Component({
  selector: 'app-attribute',
  templateUrl: './attribute.component.html',
  styleUrls: ['./attribute.component.scss'],
})
export class AttributeComponent {
  protected readonly MATERIAL_SYMBOLS_CLASS = MATERIAL_SYMBOLS_CLASS

  @Input({ required: true }) symbol!: string
  @Input({ required: true }) tooltipText!: string
  @Input({ required: true }) id!: string

  public get tooltipId() {
    return `${this.id}-tooltip`
  }
}
