import { ComponentFixture } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

import { ProfileContactsComponent } from './profile-contacts.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { ATTRIBUTE_ARIA_LABEL } from '@/test/helpers/aria'
import { NgIcon, NgIconComponent } from '@ng-icons/core'
import { textContent } from '@/test/helpers/text-content'
import { setFixtureInputs } from '@/test/helpers/set-fixture-inputs'
import { makeContact } from '../../data/__tests__/make-contact'
import { MaterialSymbolDirective } from '@/common/material-symbol.directive'
import { makeSocial } from '../../data/__tests__/make-social'
import { getComponentInstance } from '@/test/helpers/get-component-instance'
import { MockComponents } from 'ng-mocks'

describe('ProfileContactsComponent', () => {
  let component: ProfileContactsComponent
  let fixture: ComponentFixture<ProfileContactsComponent>

  it('should create', () => {
    ;[fixture, component] = makeSut()
    setFixtureInputs(fixture, { contacts: [], socials: [] })
    fixture.detectChanges()

    expect(component).toBeTruthy()
  })

  it('should display contacts', () => {
    const aContact = makeContact({ url: new URL('mailto:example@example.org') })
    const anotherContact = makeContact({ url: new URL('tel:+34666666666') })
    const contacts = [aContact, anotherContact]

    ;[fixture, component] = makeSut()
    setFixtureInputs(fixture, { contacts, socials: [] })

    fixture.detectChanges()

    const anchorElements = fixture.debugElement.queryAll(By.css('a'))

    expect(anchorElements.length)
      .withContext('as many contacts as given')
      .toEqual(contacts.length)

    anchorElements.forEach((anchorElement, index) => {
      expect(anchorElement.injector.get(MaterialSymbolDirective))
        .withContext(`contact ${index} as Material Symbol`)
        .toBeTruthy()

      expect(textContent(anchorElement))
        .withContext(`contact ${index} with its icon`)
        .toEqual(contacts[index].icon)

      expect(anchorElement.attributes['href'])
        .withContext(`contact ${index} with its link`)
        .toEqual(contacts[index].url.toString())

      expect(anchorElement.attributes[ATTRIBUTE_ARIA_LABEL])
        .withContext(`contact ${index} with its label`)
        .toEqual(contacts[index].label)
    })
  })

  it('should display socials', () => {
    const aSocial = makeSocial({ url: new URL('mailto:example@example.org') })
    const anotherSocial = makeSocial({ url: new URL('tel:+34666666666') })
    const socials = [aSocial, anotherSocial]

    ;[fixture, component] = makeSut()
    setFixtureInputs(fixture, { contacts: [], socials })

    fixture.detectChanges()

    const anchorElements = fixture.debugElement.queryAll(By.css('a'))

    expect(anchorElements.length)
      .withContext('as many socials as given')
      .toEqual(socials.length)

    anchorElements.forEach((anchorElement, index) => {
      expect(anchorElement).toBeTruthy()

      const iconElement = anchorElement.query(By.directive(NgIcon))
      const iconComponent = getComponentInstance(iconElement, NgIconComponent)

      expect(iconComponent.svg)
        .withContext(`social ${index} with its icon`)
        .toEqual(socials[index].icon)

      expect(anchorElement.attributes['href'])
        .withContext(`social ${index} with its link`)
        .toEqual(socials[index].url.toString())

      expect(anchorElement.attributes[ATTRIBUTE_ARIA_LABEL])
        .withContext(`social ${index} with its label`)
        .toEqual(socials[index].label)
    })
  })
})

const makeSut = () =>
  componentTestSetup(ProfileContactsComponent, {
    imports: [MaterialSymbolDirective, MockComponents(NgIcon)],
  })
