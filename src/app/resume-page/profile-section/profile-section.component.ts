import { Component, Inject } from '@angular/core'
import { Metadata } from '@/data/metadata'
import { METADATA } from '@/common/injection-tokens'
import { ProfilePictureComponent } from './profile-picture/profile-picture.component'
import { SectionTitleComponent } from '../section-title/section-title.component'
import { ProfileContactsComponent } from './profile-contacts/profile-contacts.component'
import { ProfileDescriptionComponent } from './profile-description/profile-description.component'

@Component({
  selector: 'app-profile-section',
  templateUrl: './profile-section.component.html',
  styleUrls: ['./profile-section.component.scss'],
  imports: [
    ProfilePictureComponent,
    SectionTitleComponent,
    ProfileContactsComponent,
    ProfileDescriptionComponent,
  ],
})
export class ProfileSectionComponent {
  readonly realName: string
  readonly nickname: string
  readonly title: string

  constructor(@Inject(METADATA) metadata: Metadata) {
    this.realName = metadata.realName
    this.nickname = metadata.nickname
    this.title = metadata.title
  }
}
