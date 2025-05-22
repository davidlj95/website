import { inject, InjectionToken } from '@angular/core'
import { Basics } from './basics'
import { Call, Email, MyLocation } from '@/data/material-symbols'
import { isNotUndefined } from '@/common/is-not-undefined'
import { socialNgIconsByName } from './social-ng-icons'
import { map, Observable } from 'rxjs'
import { JsonResumeService } from '../json-resume/json-resume.service'

type GetJsonResumeBasics = () => Observable<Basics>
export const GET_JSON_RESUME_BASICS = new InjectionToken<GetJsonResumeBasics>(
  /* istanbul ignore next */
  isDevMode ? 'GetJsonResumeBasics' : 'AJRB',
  {
    factory: () => {
      const jsonResumeService = inject(JsonResumeService)
      return () =>
        jsonResumeService.getBasics().pipe(
          map(
            ({
              name,
              label,
              image,
              summary,
              email,
              phone,
              location,
              profiles,
            }) => ({
              profile: {
                name,
                label,
                image,
                summary,
              },
              contacts: [
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
              ],
              socials: profiles
                .map((profile) => {
                  const maybeIcon = getIconFromNetwork(profile.network)
                  if (!maybeIcon) {
                    if (isDevMode) {
                      console.error(
                        `Icon not found for social network '${profile.network}'`,
                      )
                    }
                    return
                  }
                  return {
                    label: `${profile.username} at ${profile.network}`,
                    text: profile.username,
                    url: new URL(profile.url),
                    icon: maybeIcon,
                  }
                })
                .filter(isNotUndefined),
            }),
          ),
        )
    },
  },
)

const getMapsSearchUrl = (location: string): URL => {
  // https://developers.google.com/maps/documentation/urls/get-started#search-action
  const mapsSearchUrl = new URL('https://www.google.com/maps/search/?api=1')
  mapsSearchUrl.searchParams.set('query', location)
  return mapsSearchUrl
}

const getIconFromNetwork = (network: string): string | undefined => {
  const normalizedNetwork = network.toLowerCase()
  const icons = socialNgIconsByName.get(normalizedNetwork)
  /* istanbul ignore if */
  if (!icons) {
    return
  }
  return Object.values(icons)[0]
}
