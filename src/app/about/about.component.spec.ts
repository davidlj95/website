import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockComponents, MockProvider } from 'ng-mocks';
import { ensureHasComponents } from '../../test/helpers/component-testers';
import { METADATA } from '../common/injection-tokens';
import { Metadata } from '../metadata';

import { AboutComponent } from './about.component';
import { ContactSocialIconsComponent } from './contact-social-icons/contact-social-icons.component';
import { ContactTraditionalIconsComponent } from './contact-traditional-icons/contact-traditional-icons.component';
import { DescriptionComponent } from './description/description.component';
import { ProfilePictureComponent } from './profile-picture/profile-picture.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;
  const fakeMetadata: Metadata = ({
    nickname: 'bar',
    realName: 'Foo',
  } as Pick<Metadata, 'nickname' | 'realName'>) as Metadata;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AboutComponent,
        MockComponents(
          ProfilePictureComponent,
          ContactTraditionalIconsComponent,
          ContactSocialIconsComponent,
          DescriptionComponent,
        )
      ],
      providers: [
        MockProvider(METADATA, fakeMetadata),
      ],
    });
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display real name in header', () => {
    const h1 = fixture.debugElement.query(By.css('h1'));
    expect(h1.nativeElement.textContent).toContain(fakeMetadata.realName);
  })

  it('should display nickname preceded by \'@\' in header', () => {
    const h1 = fixture.debugElement.query(By.css('h1'));
    expect(h1.nativeElement.textContent).toContain(`@${fakeMetadata.nickname}`);
  })

  ensureHasComponents(() => fixture,
    ProfilePictureComponent,
    ContactTraditionalIconsComponent,
    ContactSocialIconsComponent,
    DescriptionComponent,
  )
});
