import { DebugElement } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { expectIsNotVisible } from '@/test/helpers/visibility'

import { ProfilePictureComponent } from './profile-picture.component'
import { NgOptimizedImage } from '@angular/common'

describe('ProfilePictureComponent', () => {
  let component: ProfilePictureComponent
  let fixture: ComponentFixture<ProfilePictureComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({})
    fixture = TestBed.createComponent(ProfilePictureComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })
  const PROFILE_PIC_MAIN_SELECTOR = By.css('img.main')
  const PROFILE_PIC_HUH_SELECTOR = By.css('img.huh')

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display profile picture', () => {
    expect(
      fixture.debugElement
        .query(PROFILE_PIC_MAIN_SELECTOR)
        .injector.get(NgOptimizedImage).ngSrc,
    ).toContain('profile.png')
  })

  it('should contain "huh" profile picture, despite hidden', () => {
    const profileHuhImgElement = fixture.debugElement.query(
      PROFILE_PIC_HUH_SELECTOR,
    )
    expect(profileHuhImgElement.injector.get(NgOptimizedImage).ngSrc).toContain(
      'profile_huh.png',
    )
    expectIsNotVisible(profileHuhImgElement.nativeElement)
  })

  describe('accessible easter egg', () => {
    describe('initially', () => {
      it('component should not have has been focused attribute', () => {
        expect(
          fixture.debugElement.attributes[
            ProfilePictureComponent.HAS_BEEN_FOCUSED_ATTR
          ],
        ).toBeUndefined()
      })
      // We don't receive focus events if including whole component in tab sequence
      it('component as a whole should not be in tab sequence', () => {
        expect(fixture.debugElement.attributes['tabindex']).toBe('-1')
      })
      // So we include profile picture instead
      it('main profile pic should be in tab sequence', () => {
        const profilePic = fixture.debugElement.query(PROFILE_PIC_MAIN_SELECTOR)
        expect(profilePic.attributes['tabindex']).toBe('0')
      })
    })
    describe('after profile picture has received focus at least one', () => {
      let profilePicEl: DebugElement

      beforeEach(() => {
        profilePicEl = fixture.debugElement.query(PROFILE_PIC_MAIN_SELECTOR)
        profilePicEl.triggerEventHandler('focus')
        fixture.detectChanges()
      })

      it('component should have has been focused attribute', () => {
        expect(
          fixture.debugElement.attributes[
            ProfilePictureComponent.HAS_BEEN_FOCUSED_ATTR
          ],
        ).toBe(true.toString())
      })
      it('component should be included in tab sequence', () => {
        expect(fixture.debugElement.attributes['tabindex']).toBe('0')
      })
      it('profile pic should no longer be in tab sequence', () => {
        expect(profilePicEl.attributes['tabindex']).toBe('-1')
      })
    })
  })
})
