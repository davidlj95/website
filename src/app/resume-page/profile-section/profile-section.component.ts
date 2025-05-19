import { Component, Inject, inject } from '@angular/core'
import { Metadata } from '@/data/metadata'
import { METADATA } from '@/common/injection-tokens'
import { ProfilePictureComponent } from './profile-picture/profile-picture.component'
import { SectionTitleComponent } from '../section-title/section-title.component'
import { ProfileContactsComponent } from './profile-contacts/profile-contacts.component'
import { ProfileDescriptionComponent } from './profile-description/profile-description.component'
import { BASICS_SERVICE } from '../data/basics-service'
import { toSignal } from '@angular/core/rxjs-interop'

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

  private readonly _basicsService = inject(BASICS_SERVICE)
  protected readonly _contacts = toSignal(this._basicsService.getContacts())
  protected readonly _socials = toSignal(this._basicsService.getSocials())

  constructor(@Inject(METADATA) metadata: Metadata) {
    this.realName = metadata.realName
    this.nickname = metadata.nickname
    this.title = metadata.title
  }
}
