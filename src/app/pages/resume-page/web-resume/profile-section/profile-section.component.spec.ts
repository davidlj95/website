import { ComponentFixture } from '@angular/core/testing'

import { ProfileSectionComponent } from './profile-section.component'
import { Metadata } from '@/data/metadata'
import { MockComponents, MockProvider } from 'ng-mocks'
import { ProfilePictureComponent } from './profile-picture/profile-picture.component'
import { ProfileContactsComponent } from './profile-contacts/profile-contacts.component'
import { ProfileDescriptionComponent } from './profile-description/profile-description.component'
import { By } from '@angular/platform-browser'
import { SectionTitleComponent } from '../section-title/section-title.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { METADATA } from '@/common/injection-tokens'
import { textContent } from '@/test/helpers/text-content'

describe('ProfileSectionComponent', () => {
  let component: ProfileSectionComponent
  let fixture: ComponentFixture<ProfileSectionComponent>
  const fakeMetadata: Metadata = {
    nickname: 'Fake nickname',
    realName: 'Fake real name',
    title: 'Fake title',
  } as Pick<Metadata, 'nickname' | 'realName' | 'title'> as Metadata

  beforeEach(() => {
    ;[fixture, component] = componentTestSetup(ProfileSectionComponent, {
      imports: [
        MockComponents(
          SectionTitleComponent,
          ProfilePictureComponent,
          ProfileContactsComponent,
          ProfileDescriptionComponent,
        ),
      ],
      providers: [MockProvider(METADATA, fakeMetadata)],
    })
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display real name', () => {
    const realNameElement = fixture.debugElement.query(By.css('.real-name'))

    expect(textContent(realNameElement)).toContain(fakeMetadata.realName)
  })

  it("should display nickname preceded by '@' in primary header", () => {
    const nicknameElement = fixture.debugElement.query(By.css('.nickname'))

    expect(textContent(nicknameElement)).toContain(`@${fakeMetadata.nickname}`)
  })

  it('should display title', () => {
    const headline = fixture.debugElement.query(By.css('.headline'))

    expect(textContent(headline)).toEqual(fakeMetadata.title)
  })
})
