import { Component, Inject } from '@angular/core';
import { METADATA } from '../common/injection-tokens';
import { Metadata } from '../metadata';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  public realName = this.metadata.realName;
  public nickname = this.metadata.nickname;

  constructor(
    @Inject(METADATA) private metadata: Metadata,
  ) {
  }

}
