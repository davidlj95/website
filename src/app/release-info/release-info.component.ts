import { Component } from '@angular/core'
import RELEASE_JSON from '../../../release.json'
import { ReleaseInfoSummary } from './semantic-release'

@Component({
  selector: 'app-release-info',
  templateUrl: './release-info.component.html',
  styleUrls: ['./release-info.component.scss'],
  standalone: true,
})
export class ReleaseInfoComponent {
  protected _jsonString = JSON.stringify({
    ...RELEASE_JSON.nextRelease,
    notes: undefined,
    preview: (RELEASE_JSON as ReleaseInfoSummary).preview,
    fake: (RELEASE_JSON as ReleaseInfoSummary).fake,
  })
}
