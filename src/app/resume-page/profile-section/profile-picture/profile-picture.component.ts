import { Component, HostBinding, Inject } from '@angular/core'
import { METADATA } from '@/common/injection-tokens'
import { Metadata } from '@/data/metadata'
import { NgOptimizedImage } from '@angular/common'

@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.scss'],
  imports: [NgOptimizedImage],
})
export class ProfilePictureComponent {
  readonly realName: string
  protected _hasBeenFocused = false

  static HAS_BEEN_FOCUSED_ATTR = 'data-has-been-focused'

  @HostBinding(`attr.${ProfilePictureComponent.HAS_BEEN_FOCUSED_ATTR}`)
  get hasBeenFocused() {
    return this._hasBeenFocused ? true : undefined
  }

  @HostBinding('attr.tabindex') get tabIndex() {
    return this.hasBeenFocused ? 0 : -1
  }

  @HostBinding('attr.aria-label') ariaLabel = 'Profile picture'

  constructor(@Inject(METADATA) metadata: Metadata) {
    this.realName = metadata.realName
  }

  onFocus() {
    this._hasBeenFocused = true
  }
}
