import { Component, Inject } from '@angular/core'
import { Call, Email, MyLocation } from '../../../material-symbols'
import { MaterialSymbolDirective } from '@/common/material-symbol.directive'
import { NgFor } from '@angular/common'
import { JSON_RESUME_BASICS, JsonResumeBasics } from '../json-resume-basics'
import {
  faBrandGithub,
  faBrandLinkedinIn,
  faBrandStackOverflow,
  faBrandXTwitter,
} from '@ng-icons/font-awesome/brands'
import { NgIcon, provideIcons } from '@ng-icons/core'

const icons = {
  faBrandGithub,
  faBrandLinkedinIn,
  faBrandStackOverflow,
  faBrandXTwitter,
} satisfies Parameters<typeof provideIcons>[0]

@Component({
  selector: 'app-profile-contacts',
  templateUrl: './profile-contacts.component.html',
  styleUrls: ['./profile-contacts.component.scss'],
  standalone: true,
  imports: [NgFor, MaterialSymbolDirective, NgIcon],
  providers: [provideIcons(icons)],
})
export class ProfileContactsComponent {
  protected readonly _traditional: ReadonlyArray<ContactItem>
  protected readonly _social: ReadonlyArray<ContactItem>

  constructor(@Inject(JSON_RESUME_BASICS) jsonResumeBasics: JsonResumeBasics) {
    this._traditional = jsonResumeBasicsToTraditionalContacts(jsonResumeBasics)
    this._social = jsonResumeBasicsToSocialContacts(jsonResumeBasics)
  }
}

interface ContactItem {
  readonly name: string
  readonly icon: string
  readonly href: string
}

const jsonResumeBasicsToTraditionalContacts = (
  jsonResumeBasics: JsonResumeBasics,
): ReadonlyArray<ContactItem> => [
  {
    name: 'Email',
    icon: Email,
    href: new URL(`mailto:${jsonResumeBasics.email}`).toString(),
  },
  {
    name: 'Phone',
    icon: Call,
    href: new URL(`tel:${jsonResumeBasics.phone}`).toString(),
  },
  {
    name: 'Location',
    icon: MyLocation,
    href: getMapsSearchUrl(jsonResumeBasics.location.city).toString(),
  },
]

const getMapsSearchUrl = (location: string): URL => {
  // https://developers.google.com/maps/documentation/urls/get-started#search-action
  const mapsSearchUrl = new URL('https://www.google.com/maps/search/?api=1')
  mapsSearchUrl.searchParams.set('query', location)
  return mapsSearchUrl
}

const jsonResumeBasicsToSocialContacts = (
  jsonResumeBasics: JsonResumeBasics,
): ReadonlyArray<ContactItem> =>
  jsonResumeBasics.profiles.map((profile) => ({
    name: `${profile.username} at ${profile.network}`,
    href: profile.url,
    icon: getIconFromNetwork(profile.network),
  }))

const getIconFromNetwork = (network: string): string => {
  const normalizedNetwork = network.toLowerCase()
  const icon = iconsByNetwork.get(normalizedNetwork)
  if (!icon) {
    throw new Error(`Icon not found for ${normalizedNetwork}`)
  }
  return icon
}

const iconsByNetwork = new Map<string, string>([
  ['github', icons.faBrandGithub],
  ['linkedin', icons.faBrandLinkedinIn],
  ['stackoverflow', icons.faBrandStackOverflow],
  ['x', icons.faBrandXTwitter],
])
