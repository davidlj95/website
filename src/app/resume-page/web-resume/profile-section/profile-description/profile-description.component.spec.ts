import { ProfileDescriptionComponent } from './profile-description.component'
import { ComponentFixture } from '@angular/core/testing'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { provideNoopAnimations } from '@angular/platform-browser/animations'

describe('ProfileDescriptionComponent', () => {
  let fixture: ComponentFixture<ProfileDescriptionComponent>

  beforeEach(() => {
    ;[fixture] = componentTestSetup(ProfileDescriptionComponent, {
      providers: [provideNoopAnimations()],
    })
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy()
  })
})
