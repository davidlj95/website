import { Component, input } from '@angular/core'
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
  imports: [MaterialSymbolDirective],
  host: {
    tabindex: '0',
  },
})
export class AttributeComponent {
  readonly symbol = input.required<string>()

  protected _id = `${ATTRIBUTE_ID_PREFIX}${nextId++}`
}
