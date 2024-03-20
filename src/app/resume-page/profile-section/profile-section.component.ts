import { Component, Inject } from '@angular/core'
import { DescriptionLine, Metadata } from '../../metadata'
import { METADATA } from '@common/injection-tokens'
import { ProfileDescriptionComponent } from './profile-description/profile-description.component'
import { ProfileContactSocialIconsComponent } from './profile-contact-social-icons/profile-contact-social-icons.component'
import { ProfileContactTraditionalIconsComponent } from './profile-contact-traditional-icons/profile-contact-traditional-icons.component'
import { ProfilePictureComponent } from './profile-picture/profile-picture.component'
import { SectionTitleComponent } from '../section-title/section-title.component'

@Component({
  selector: 'app-profile-section',
  templateUrl: './profile-section.component.html',
  styleUrls: ['./profile-section.component.scss'],
  standalone: true,
  imports: [
    SectionTitleComponent,
    ProfilePictureComponent,
    ProfileContactTraditionalIconsComponent,
    ProfileContactSocialIconsComponent,
    ProfileDescriptionComponent,
  ],
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
