import { Component, Inject } from '@angular/core'
import { DescriptionLine, Metadata } from '@/data/metadata'
import { METADATA } from '@/common/injection-tokens'
import { ProfilePictureComponent } from './profile-picture/profile-picture.component'
import { SectionTitleComponent } from '../section-title/section-title.component'
import { ProfileContactsComponent } from './profile-contacts/profile-contacts.component'
import { ProfileDescriptionComponent } from './profile-description/profile-description.component'

@Component({
  selector: 'app-profile-section',
  templateUrl: './profile-section.component.html',
  styleUrls: ['./profile-section.component.scss'],
  standalone: true,
  imports: [
    ProfilePictureComponent,
    SectionTitleComponent,
    ProfileContactsComponent,
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
