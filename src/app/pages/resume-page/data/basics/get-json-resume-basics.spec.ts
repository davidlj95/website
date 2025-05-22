import { JsonResumeBasics } from '../json-resume/json-resume-types'
import { serviceTestSetup } from '@/test/helpers/service-test-setup'
import { GET_JSON_RESUME_BASICS } from './get-json-resume-basics'
import { Call, Email, MyLocation } from '@/data/material-symbols'
import { faBrandGithub } from '@ng-icons/font-awesome/brands'
import { makeJsonResumeBasics } from './__tests__/make-json-resume-basics'
import { MockProvider } from 'ng-mocks'
import { JsonResumeService } from '../json-resume/json-resume.service'
import { lastValueFrom, of } from 'rxjs'

describe('GetJsonResumeBasics', () => {
  it('should be created', () => {
    expect(makeSut()).toBeTruthy()
  })

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
    const { contacts } = await callSut({
      jsonResumeBasics: makeJsonResumeBasics({ email, phone, location }),
    })

    expect(contacts).toEqual([
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
        text: `${makeJsonResumeBasics({ email, phone, location }).location.city}, ${
          makeJsonResumeBasics({
            email,
            phone,
            location,
          }).location.countryCode
        }`,
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

    const { socials } = await callSut({
      jsonResumeBasics: makeJsonResumeBasics({ profiles: [github] }),
    })

    expect(socials).toEqual([
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

    const consoleErrorSpy = spyOn(console, 'error')
    const { socials } = await callSut({
      jsonResumeBasics: makeJsonResumeBasics({
        profiles: [unknownProfile],
      }),
    })

    expect(socials).toEqual([])

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      jasmine.stringContaining('Icon not found'),
    )
  })
})

const makeSut = ({
  jsonResumeBasics,
}: { jsonResumeBasics?: JsonResumeBasics } = {}) =>
  serviceTestSetup(GET_JSON_RESUME_BASICS, {
    providers: [
      MockProvider(JsonResumeService, {
        getBasics: () => of(jsonResumeBasics ?? makeJsonResumeBasics()),
      }),
    ],
  })

const callSut = async (opts: Parameters<typeof makeSut>[0] = {}) =>
  await lastValueFrom(makeSut(opts)())
