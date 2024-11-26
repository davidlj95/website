import { Component, Inject } from '@angular/core'
import { Call, Email, MyLocation } from '@/data/material-symbols'
import { MaterialSymbolDirective } from '@/common/material-symbol.directive'

import { JSON_RESUME_BASICS, JsonResumeBasics } from '../json-resume-basics'
import {
  faBrandGithub,
  faBrandLinkedinIn,
  faBrandStackOverflow,
  faBrandXTwitter,
} from '@ng-icons/font-awesome/brands'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { isNotUndefined } from '@/common/is-not-undefined'

type NgIcons = Parameters<typeof provideIcons>[0]
const ngIconsByName = new Map<string, NgIcons>([
  ['github', { faBrandGithub }],
  ['linkedin', { faBrandLinkedinIn }],
  ['stackoverflow', { faBrandStackOverflow }],
  ['x', { faBrandXTwitter }],
])
const ngIcons: NgIcons = [...ngIconsByName.values()].reduce<NgIcons>(
  (acc, curr) => ({ ...acc, ...curr }),
  {},
)

@Component({
  selector: 'app-profile-contacts',
  templateUrl: './profile-contacts.component.html',
  styleUrls: ['./profile-contacts.component.scss'],
  imports: [MaterialSymbolDirective, NgIcon],
  providers: [provideIcons(ngIcons)],
})
export class ProfileContactsComponent {
  protected readonly _traditional: readonly ContactItem[]
  protected readonly _social: readonly ContactItem[]

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
): readonly ContactItem[] => [
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
): readonly ContactItem[] =>
  jsonResumeBasics.profiles
    .map((profile) => {
      const maybeIcon = getIconFromNetwork(profile.network)
      if (!maybeIcon) {
        if (isDevMode) {
          console.error(
            `ProfileContacts: Icon not found for network '${profile.network}'`,
          )
        }
        return undefined
      }
      return {
        name: `${profile.username} at ${profile.network}`,
        href: profile.url,
        icon: maybeIcon,
      } satisfies ContactItem
    })
    .filter(isNotUndefined)

const getIconFromNetwork = (network: string): string | undefined => {
  const normalizedNetwork = network.toLowerCase()
  const icons = ngIconsByName.get(normalizedNetwork)
  if (!icons) {
    return
  }
  return Object.values(icons)[0]
}
