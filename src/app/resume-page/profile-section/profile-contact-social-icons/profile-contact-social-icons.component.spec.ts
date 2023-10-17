import { DebugElement } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { FaIconComponent } from '@fortawesome/angular-fontawesome'
import { MockProvider } from 'ng-mocks'
import { METADATA } from '../../../common/injection-tokens'
import { Metadata } from '../../../metadata'

import { ProfileContactSocialIconsComponent } from './profile-contact-social-icons.component'
import { byComponent } from '../../../../test/helpers/component-query-predicates'

describe('ContactSocialIconsComponent', () => {
  let component: ProfileContactSocialIconsComponent
  let fixture: ComponentFixture<ProfileContactSocialIconsComponent>
  const nickname = 'foo'

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileContactSocialIconsComponent, FaIconComponent],
      providers: [
        MockProvider(METADATA, { nickname: nickname } as Pick<
          Metadata,
          'nickname'
        > as Metadata),
      ],
    })
    fixture = TestBed.createComponent(ProfileContactSocialIconsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('#items', () => {
    it('should have the nickname in every url', () => {
      component.items.forEach((item, index) => {
        expect(item.url.pathname)
          .withContext(`item ${index}`)
          .toContain(nickname)
      })
    })
    it('should have an icon related to the name', () => {
      component.items.forEach((item, index) => {
        const iconNameWithoutDashes = item.icon.iconName.replace('-', '')
        expect(iconNameWithoutDashes)
          .withContext(`item ${index}`)
          .toContain(item.name.toLowerCase())
      })
    })
  })

  it('should list all contact methods with their icons, links and accessibility labels', () => {
    const itemElements = fixture.debugElement.queryAll(By.css('li'))
    expect(itemElements.length)
      .withContext('same number of items')
      .toBe(component.items.length)
    component.items.forEach((item, index) => {
      const itemElement = itemElements[index]
      const iconElement = itemElement.query(byComponent(FaIconComponent))
      expect(getIconNameFromFontAwesomeElement(iconElement))
        .withContext(`item ${index} icon`)
        .toEqual(item.icon.iconName)

      // noinspection DuplicatedCode
      const anchorElement = itemElement.query(By.css('a'))
      expect(anchorElement)
        .withContext(`item ${index} link exists`)
        .toBeTruthy()
      expect(anchorElement.attributes['href'])
        .withContext(`item ${index} link URL`)
        .toEqual(item.url.toString())
      expect(anchorElement.attributes['aria-label'])
        .withContext(`item ${index} accessibility label`)
        .toEqual(item.name)
    })
  })

  function getIconNameFromFontAwesomeElement(faElement: DebugElement): string {
    return faElement.children[0].nativeElement.getAttribute('data-icon')
  }
})
