import { Component, Inject } from '@angular/core';
import { RELEASE } from '../common/injection-tokens';
import { ReleaseInfo } from './semantic-release';

@Component({
  selector: 'app-release-info',
  templateUrl: './release-info.component.html',
  styleUrls: ['./release-info.component.scss'],
})
export class ReleaseInfoComponent {
  constructor(@Inject(RELEASE) private release: ReleaseInfo) {
  }

  protected get releaseAsJsonString() {
    return JSON.stringify(this.release, null, 2)
  }
}


