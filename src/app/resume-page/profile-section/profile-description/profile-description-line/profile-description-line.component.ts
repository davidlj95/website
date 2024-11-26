import { Component, input } from '@angular/core'
import { MaterialSymbolDirective } from '@/common/material-symbol.directive'

import { DescriptionLine } from '@/data/metadata'
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'app-profile-description-line',
  imports: [MaterialSymbolDirective],
  templateUrl: './profile-description-line.component.html',
  styleUrl: './profile-description-line.component.scss',
})
export class ProfileDescriptionLineComponent {
  readonly line = input.required<DescriptionLine>()

  constructor(protected readonly _domSanitizer: DomSanitizer) {}
}
