import { map, Observable } from 'rxjs'
import { inject, InjectionToken } from '@angular/core'
import { JsonResumeService } from '../json-resume/json-resume.service'
import { Call, Email, MyLocation } from '@/data/material-symbols'
import { isNotUndefined } from '@/common/is-not-undefined'
import { JsonResumeBasics } from '../json-resume/types'
import { Contact, Profile, Social } from './basics'
import { socialNgIconsByName } from './social-ng-icons'

interface BasicsService {
  getProfile(): Observable<Profile>
  getContacts(): Observable<readonly Contact[]>
  getSocials(): Observable<readonly Social[]>
}

export const BASICS_SERVICE = new InjectionToken<BasicsService>(
  /* istanbul ignore next */
  isDevMode ? 'BasicsService' : 'rBS',
  {
    factory: () => {
      const jsonResume = inject(JsonResumeService)
      return {
        getProfile: () => jsonResume.getBasics().pipe(map(basicsToProfile)),
        getContacts: () => jsonResume.getBasics().pipe(map(basicsToContacts)),
        getSocials: () =>
          jsonResume
            .getBasics()
            .pipe(map((basics) => profilesToSocials(basics.profiles))),
      }
    },
  },
)

const basicsToProfile = ({
  name,
  label,
  image,
  summary,
}: JsonResumeBasics) => ({
  name,
  label,
  image,
  summary,
})

const basicsToContacts = ({
  email,
  phone,
  location,
}: JsonResumeBasics): readonly Contact[] => [
  {
    label: 'Email',
    icon: Email,
    text: email,
    url: new URL(`mailto:${email}`),
  },
  {
    label: 'Phone',
    icon: Call,
    text: phone,
    url: new URL(`tel:${phone}`),
  },
  {
    label: 'Location',
    icon: MyLocation,
    text: `${location.city}, ${location.countryCode}`,
    url: getMapsSearchUrl(location.city),
  },
]

const getMapsSearchUrl = (location: string): URL => {
  // https://developers.google.com/maps/documentation/urls/get-started#search-action
  const mapsSearchUrl = new URL('https://www.google.com/maps/search/?api=1')
  mapsSearchUrl.searchParams.set('query', location)
  return mapsSearchUrl
}

const profilesToSocials = (
  profiles: JsonResumeBasics['profiles'],
): readonly Social[] =>
  profiles
    .map((profile) => {
      const maybeIcon = getIconFromNetwork(profile.network)
      if (!maybeIcon) {
        if (isDevMode) {
          console.error(
            `Icon not found for social network '${profile.network}'`,
          )
        }
        return undefined
      }
      return {
        label: `${profile.username} at ${profile.network}`,
        text: profile.username,
        url: new URL(profile.url),
        icon: maybeIcon,
      }
    })
    .filter(isNotUndefined)

const getIconFromNetwork = (network: string): string | undefined => {
  const normalizedNetwork = network.toLowerCase()
  const icons = socialNgIconsByName.get(normalizedNetwork)
  if (!icons) {
    return
  }
  return Object.values(icons)[0]
}
