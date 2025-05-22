import { Component, Inject, inject } from '@angular/core'
import { Metadata } from '@/data/metadata'
import { METADATA } from '@/common/injection-tokens'
import { ProfilePictureComponent } from './profile-picture/profile-picture.component'
import { SectionTitleComponent } from '../section-title/section-title.component'
import { ProfileContactsComponent } from './profile-contacts/profile-contacts.component'
import { ProfileDescriptionComponent } from './profile-description/profile-description.component'
import { toSignal } from '@angular/core/rxjs-interop'
import { GET_JSON_RESUME_BASICS } from '../../data/basics/get-json-resume-basics'

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'section[appProfile]',
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

  protected readonly _basics = toSignal(inject(GET_JSON_RESUME_BASICS)())

  constructor(@Inject(METADATA) metadata: Metadata) {
    this.realName = metadata.realName
    this.nickname = metadata.nickname
    this.title = metadata.title
  }
}
