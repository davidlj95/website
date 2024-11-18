import { ComponentFixture } from '@angular/core/testing'

import { GiftsPageComponent } from './gifts-page.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { By } from '@angular/platform-browser'

describe('GiftsPageComponent', () => {
  let component: GiftsPageComponent
  let fixture: ComponentFixture<GiftsPageComponent>

  beforeEach(async () => {
    ;[fixture, component] = componentTestSetup(GiftsPageComponent)
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should contain link to gift preferences', () => {
    const giftPreferencesAnchorElement = fixture.debugElement.query(
      By.css('a[href="https://www.giftster.com/preferences/1747782/"]'),
    )

    expect(giftPreferencesAnchorElement).not.toBeNull()
  })

  it('should contain link to wishlist', () => {
    const wishlistAnchorElement = fixture.debugElement.query(
      By.css('a[href="https://www.giftster.com/list/hz6ij/"]'),
    )

    expect(wishlistAnchorElement).not.toBeNull()
  })
})
