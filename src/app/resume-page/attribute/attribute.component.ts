import { Component, Input } from '@angular/core'
import { MaterialSymbolDirective } from '@/common/material-symbol.directive'

/**
 * Pattern for unique id generation
 * https://github.com/angular/components/blob/17.3.0/src/cdk/a11y/aria-describer/aria-describer.ts#L47-L48
 * @visibleForTesting
 */
export const ATTRIBUTE_ID_PREFIX = `app-attr-`
let nextId = 0

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
  protected _id: string = `${ATTRIBUTE_ID_PREFIX}${nextId++}`
}
