import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-attribute',
  templateUrl: './attribute.component.html',
  styleUrls: ['./attribute.component.scss'],
})
export class AttributeComponent {
  @Input({ required: true }) symbol!: string
  @Input({ required: true }) id!: string

  public get tooltipId() {
    return `${this.id}-tooltip`
  }
}
