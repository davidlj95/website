import { Component, Inject } from '@angular/core'
import { DescriptionLine, Metadata } from '../../metadata'
import { METADATA } from '../../common/injection-tokens'

@Component({
  selector: 'app-profile-section',
  templateUrl: './profile-section.component.html',
  styleUrls: ['./profile-section.component.scss'],
})
export class ProfileSectionComponent {
  public readonly realName = this.metadata.realName
  public readonly nickname = this.metadata.nickname
  public readonly title = this.metadata.title
  public readonly rootLine = new DescriptionLine(
    undefined,
    this.metadata.descriptionLines,
  )

  constructor(@Inject(METADATA) private metadata: Metadata) {}
}
