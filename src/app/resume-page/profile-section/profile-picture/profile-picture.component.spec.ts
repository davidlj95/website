import { DebugElement } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { expectIsNotVisible } from '@/test/helpers/visibility'

import { ProfilePictureComponent } from './profile-picture.component'
import { NgOptimizedImage } from '@angular/common'
import { ATTRIBUTE_ARIA_LABEL } from '@/test/helpers/aria'

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

  it('should contain a label', () => {
    expect(fixture.debugElement.attributes[ATTRIBUTE_ARIA_LABEL]).toContain(
      'Profile',
    )
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
    expectIsNotVisible(profileHuhImgElement)
  })

  describe('accessible easter egg', () => {
    describe('initially', () => {
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

      it('component should be included in tab sequence', () => {
        expect(fixture.debugElement.attributes['tabindex']).toBe('0')
      })

      it('profile pic should no longer be in tab sequence', () => {
        expect(profilePicEl.attributes['tabindex']).toBe('-1')
      })
    })
  })
})
