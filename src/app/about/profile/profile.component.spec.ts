import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ProfileComponent } from './profile.component'
import { Metadata } from '../../metadata'
import { MockComponents, MockProvider } from 'ng-mocks'
import { ProfilePictureComponent } from './profile-picture/profile-picture.component'
import { ContactTraditionalIconsComponent } from './contact-traditional-icons/contact-traditional-icons.component'
import { ContactSocialIconsComponent } from './contact-social-icons/contact-social-icons.component'
import { DescriptionComponent } from './description/description.component'
import { METADATA } from '../../common/injection-tokens'
import { By } from '@angular/platform-browser'
import { ensureHasComponents } from '../../../test/helpers/component-testers'
import { H2Component } from '../h2/h2.component'

describe('ProfileComponent', () => {
  let component: ProfileComponent
  let fixture: ComponentFixture<ProfileComponent>
  const fakeMetadata: Metadata = {
    nickname: 'Fake nickname',
    realName: 'Fake real name',
    title: 'Fake title',
  } as Pick<Metadata, 'nickname' | 'realName' | 'title'> as Metadata

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProfileComponent,
        MockComponents(
          H2Component,
          ProfilePictureComponent,
          ContactTraditionalIconsComponent,
          ContactSocialIconsComponent,
          DescriptionComponent,
        ),
      ],
      providers: [MockProvider(METADATA, fakeMetadata)],
    })
    fixture = TestBed.createComponent(ProfileComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display real name', () => {
    const realNameElement = fixture.debugElement.query(By.css('.real-name'))
    expect(realNameElement.nativeElement.textContent).toContain(
      fakeMetadata.realName,
    )
  })

  it("should display nickname preceded by '@' in primary header", () => {
    const nicknameElement = fixture.debugElement.query(By.css('.nickname'))
    expect(nicknameElement.nativeElement.textContent).toContain(
      `@${fakeMetadata.nickname}`,
    )
  })

  it('should display title', () => {
    const headline = fixture.debugElement.query(By.css('.headline'))
    expect(headline.nativeElement.textContent).toEqual(fakeMetadata.title)
  })

  ensureHasComponents(
    () => fixture,
    H2Component,
    ProfilePictureComponent,
    ContactTraditionalIconsComponent,
    ContactSocialIconsComponent,
    DescriptionComponent,
  )
})
