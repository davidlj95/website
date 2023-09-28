import { Component, Inject } from '@angular/core'
import { RELEASE } from '../common/injection-tokens'
import { ReleaseInfoSummary } from './semantic-release'

@Component({
  selector: 'app-release-info',
  templateUrl: './release-info.component.html',
  styleUrls: ['./release-info.component.scss'],
})
export class ReleaseInfoComponent {
  constructor(@Inject(RELEASE) private release: ReleaseInfoSummary) {}

  protected get releaseAsJsonString() {
    const nextRelease = this.release.nextRelease
    const summary = {
      ...nextRelease,
      notes: undefined,
      preview: this.release.preview,
      fake: this.release.fake,
    }
    return JSON.stringify(summary, null, 2)
  }
}
