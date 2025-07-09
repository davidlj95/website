import { Component, inject } from '@angular/core'
import { METADATA } from '@/common/injection-tokens'
import { Metadata } from '@/data/metadata'
import { NgOptimizedImage } from '@angular/common'

@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.scss'],
  imports: [NgOptimizedImage],
  host: {
    'aria-label': 'Profile picture',
    '[attr.data-has-been-focused]': '_hasBeenFocused ? true : undefined',
    '[attr.tabindex]': '_hasBeenFocused ? 0 : -1',
  },
})
export class ProfilePictureComponent {
  readonly realName: string
  protected _hasBeenFocused = false

  constructor() {
    const metadata = inject<Metadata>(METADATA)

    this.realName = metadata.realName
  }

  onFocus() {
    this._hasBeenFocused = true
  }
}
