import {
  JsonResumeBasics,
  JsonResumeService,
} from '../json-resume/json-resume.service'
import RESUME from '@/data/resume.json'
import { serviceTestSetup } from '@/test/helpers/service-test-setup'
import { BASICS_SERVICE } from './basics-service'
import { MockProvider } from 'ng-mocks'
import { firstValueFrom, of } from 'rxjs'
import { Call, Email, MyLocation } from '@/data/material-symbols'
import { faBrandGithub } from '@ng-icons/font-awesome/brands'

describe('BasicsService', () => {
  it('should map email, phone and location as contacts', async () => {
    const email = 'foo@example.org'
    const phone = '+34 666 666 666'
    const location: JsonResumeBasics['location'] = {
      address: 'Major street, 4',
      postalCode: '28001',
      city: 'Madrid',
      region: 'Madrid',
      countryCode: 'ES',
    }
    const basics = makeJsonResumeBasics({ email, phone, location })

    const sut = makeSut({ basics })

    const actual = await firstValueFrom(sut.getContacts())

    expect(actual).toEqual([
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
        text: `${basics.location.city}, ${basics.location.countryCode}`,
        url: new URL(
          `https://www.google.com/maps/search/?api=1&query=${location.city}`,
        ),
      },
    ])
  })

  it('should map profiles as socials', async () => {
    const github = {
      network: 'github',
      username: 'foo',
      url: 'https://github.com/foo',
    } satisfies JsonResumeBasics['profiles'][number]

    const basics = makeJsonResumeBasics({ profiles: [github] })

    const sut = makeSut({ basics })

    const actual = await firstValueFrom(sut.getSocials())

    expect(actual).toEqual([
      {
        label: `${github.username} at ${github.network}`,
        icon: faBrandGithub,
        text: github.username,
        url: new URL(github.url),
      },
    ])
  })

  it('should not map unknown profiles and log about it (in dev mode)', async () => {
    const unknownProfile = {
      network: 'unknown-network',
      username: 'foo',
      url: 'https://example.net/foo',
    } satisfies JsonResumeBasics['profiles'][number]

    const basics = makeJsonResumeBasics({ profiles: [unknownProfile] })
    const consoleErrorSpy = spyOn(console, 'error')
    const sut = makeSut({ basics })
    const actual = await firstValueFrom(sut.getSocials())

    expect(actual).toEqual([])

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      jasmine.stringContaining('Icon not found'),
    )
  })
})

const makeJsonResumeBasics = (overrides: Partial<JsonResumeBasics>) => ({
  ...RESUME.basics,
  ...overrides,
})

const makeSut = ({ basics }: { basics?: JsonResumeBasics } = {}) =>
  serviceTestSetup(BASICS_SERVICE, {
    providers: [
      basics
        ? MockProvider(JsonResumeService, { getBasics: () => of(basics) })
        : [],
    ],
  })
