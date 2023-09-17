import { Component, Inject } from '@angular/core';
import { METADATA } from '../../common/injection-tokens';
import { Metadata } from '../../metadata';

@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.scss']
})
export class ProfilePictureComponent {
  protected realName: string = this.metadata.realName;

  constructor(
    @Inject(METADATA) private metadata: Metadata,
  ) {
  }
}
