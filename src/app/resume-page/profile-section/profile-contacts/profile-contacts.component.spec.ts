import { ComponentFixture } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import resume from '../../../../../assets/resume.json'

import { ProfileContactsComponent } from './profile-contacts.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { MockProvider } from 'ng-mocks'
import { Call, Email, MyLocation } from '../../../material-symbols'
import { ATTRIBUTE_ARIA_LABEL } from '@/test/helpers/aria'
import { JSON_RESUME_BASICS, JsonResumeBasics } from '../json-resume-basics'
import { NgIcon } from '@ng-icons/core'

describe('ProfileContactsComponent', () => {
  let component: ProfileContactsComponent
  let fixture: ComponentFixture<ProfileContactsComponent>

  it('should create', () => {
    ;[fixture, component] = makeSut()
    fixture.detectChanges()

    expect(component).toBeTruthy()
  })

  it('should display email link', () => {
    const email = 'example@example.org'
    const jsonResumeBasics = makeJsonResumeBasics({ email })

    ;[fixture, component] = makeSut({ jsonResumeBasics })
    fixture.detectChanges()

    const anchorElement = fixture.debugElement.query(
      By.css(`a[href="mailto:${email}"]`),
    )
    expect(anchorElement.nativeElement.textContent.trim()).toEqual(Email)
    expect(anchorElement.attributes[ATTRIBUTE_ARIA_LABEL]).toEqual('Email')
  })

  it('should display phone link', () => {
    const phone = '+1 555 0001'
    const jsonResumeBasics = makeJsonResumeBasics({ phone })

    ;[fixture, component] = makeSut({ jsonResumeBasics })
    fixture.detectChanges()

    const anchorElement = fixture.debugElement.query(
      By.css(`a[href="tel:${phone}"]`),
    )
    expect(anchorElement.nativeElement.textContent.trim()).toEqual(Call)
    expect(anchorElement.attributes[ATTRIBUTE_ARIA_LABEL]).toEqual('Phone')
  })

  it('should display location link', () => {
    const location = {
      address: 'Fake street, 123',
      city: 'Barcelona',
      postalCode: '08001',
      region: 'Barcelona',
      countryCode: 'ES',
    } satisfies JsonResumeBasics['location']
    const jsonResumeBasics = makeJsonResumeBasics({ location })

    ;[fixture, component] = makeSut({ jsonResumeBasics })
    fixture.detectChanges()

    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${location.city}`
    const anchorElement = fixture.debugElement.query(
      By.css(`a[href="${mapsUrl}"]`),
    )
    expect(anchorElement.nativeElement.textContent.trim()).toEqual(MyLocation)
    expect(anchorElement.attributes[ATTRIBUTE_ARIA_LABEL]).toEqual('Location')
  })

  describe('social profiles', () => {
    const profiles = [
      makeJsonResumeBasicsProfile('GiTHuB'),
      makeJsonResumeBasicsProfile('LiNKedIN'),
      makeJsonResumeBasicsProfile('STAckOverFLOw'),
      makeJsonResumeBasicsProfile('TwiTTer'),
    ] satisfies JsonResumeBasics['profiles']
    for (const profile of profiles) {
      const networkName = profile.network.toLowerCase()
      it(`should display ${networkName} link`, () => {
        const profiles = [profile]
        const jsonResumeBasics = makeJsonResumeBasics({ profiles })

        ;[fixture, component] = makeSut({ jsonResumeBasics })
        fixture.detectChanges()

        const anchorElement = fixture.debugElement.query(
          By.css(`a[href="${profile.url}"]`),
        )
        expect(anchorElement.attributes[ATTRIBUTE_ARIA_LABEL]).toEqual(
          `${profile.username} at ${profile.network}`,
        )
      })
    }
  })
})

const sampleJsonResumeBasics: JsonResumeBasics = resume.basics
const makeJsonResumeBasics = (overrides: Partial<JsonResumeBasics>) => ({
  ...sampleJsonResumeBasics,
  ...overrides,
})

const makeSut = (opts: { jsonResumeBasics?: JsonResumeBasics } = {}) =>
  componentTestSetup(ProfileContactsComponent, {
    imports: [ProfileContactsComponent, NgIcon],
    providers: [
      opts.jsonResumeBasics
        ? MockProvider(JSON_RESUME_BASICS, opts.jsonResumeBasics)
        : [],
    ],
  })

function makeJsonResumeBasicsProfile(
  network: string,
): JsonResumeBasics['profiles'][number] {
  const username = 'mrFoo'
  return {
    network,
    username,
    url: `https://${network.toLowerCase()}.com/${username}`,
  }
}
