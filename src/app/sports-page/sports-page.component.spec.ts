import { ComponentFixture } from '@angular/core/testing'

import { SportsPageComponent } from './sports-page.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { By } from '@angular/platform-browser'

describe('SportsPageComponent', () => {
  let component: SportsPageComponent
  let fixture: ComponentFixture<SportsPageComponent>

  beforeEach(async () => {
    ;[fixture, component] = componentTestSetup(SportsPageComponent)
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should contain link to Playtomic profile', () => {
    const playtomicAnchorElement = fixture.debugElement.query(
      By.css('a[href="https://app.playtomic.io/profile/user/1463090"]'),
    )

    expect(playtomicAnchorElement).not.toBeNull()
  })

  it('should contain Strava latest activities embed', () => {
    const stravaLatestRunsIframeElement = fixture.debugElement.query(
      By.css(
        'iframe[src="https://www.strava.com/athletes/116896062/latest-rides/2258b4e99aeb51898175a798dc9a4a15067dfc26"]',
      ),
    )

    expect(stravaLatestRunsIframeElement).not.toBeNull()
  })
})
