import { ComponentFixture } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

import { ProfileContactTraditionalIconsComponent } from './profile-contact-traditional-icons.component'
import { componentTestSetup } from '@test/helpers/component-test-setup'

describe('ContactTraditionalIconsComponent', () => {
  let component: ProfileContactTraditionalIconsComponent
  let fixture: ComponentFixture<ProfileContactTraditionalIconsComponent>

  beforeEach(() => {
    ;[fixture, component] = componentTestSetup(
      ProfileContactTraditionalIconsComponent,
    )
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should list all contact methods with their icons, links and accessibility labels', () => {
    const itemElements = fixture.debugElement.queryAll(By.css('li'))
    expect(itemElements.length)
      .withContext('same number of items')
      .toBe(component.items.length)
    component.items.forEach((item, index) => {
      const itemElement = itemElements[index]
      const iconText = itemElement.nativeElement.textContent
      expect(iconText)
        .withContext(`item ${index} icon`)
        .toEqual(item.materialSymbol)

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
})
