import { Component, input } from '@angular/core'
import { MaterialSymbolDirective } from '@/common/material-symbol.directive'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { socialNgIcons } from '../../../data/basics/social-ng-icons'
import { Contact, Social } from '../../../data/basics/basics'

@Component({
  selector: 'app-profile-contacts',
  templateUrl: './profile-contacts.component.html',
  styleUrls: ['./profile-contacts.component.scss'],
  imports: [MaterialSymbolDirective, NgIcon],
  providers: [provideIcons(socialNgIcons)],
})
export class ProfileContactsComponent {
  readonly contacts = input.required<readonly Contact[]>()
  readonly socials = input.required<readonly Social[]>()
}
