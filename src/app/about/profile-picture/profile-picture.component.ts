import { Component, HostBinding, Inject } from '@angular/core';
import { METADATA } from '../../common/injection-tokens';
import { Metadata } from '../../metadata';

@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.scss'],
})
export class ProfilePictureComponent {
  protected realName: string = this.metadata.realName;
  protected _hasBeenFocused= false;

  public static HAS_BEEN_FOCUSED_ATTR = 'data-has-been-focused'

  @HostBinding(`attr.${ProfilePictureComponent.HAS_BEEN_FOCUSED_ATTR}`) public get hasBeenFocused() {
    return this._hasBeenFocused ? true : undefined
  }

  @HostBinding('attr.tabindex') public get tabIndex() {
    return this.hasBeenFocused ? 0 : -1
  }

  @HostBinding('attr.aria-label') public ariaLabel  = 'Profile picture'

  constructor(
    @Inject(METADATA) private metadata: Metadata,
  ) {
  }

  onFocus() {
    this._hasBeenFocused = true
  }
}
