import { Component, input } from '@angular/core'
import { Attribute } from '../../data/attribute'
import { AttributeComponent } from './attribute/attribute.component'

@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.component.html',
  styleUrls: ['./attributes.component.scss'],
  imports: [AttributeComponent],
})
export class AttributesComponent {
  readonly attributes = input.required<readonly Attribute[]>()
}
