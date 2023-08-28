import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockProvider } from 'ng-mocks';
import { METADATA } from '../common/injection-tokens';
import { Metadata } from '../metadata';

import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let fakeMetadata: Metadata = ({
    nickname: 'bar',
    realName: 'Foo',
    descriptionLines: [
      {emoji: '🧪', text: 'Foobar'},
      {emoji: '👁️‍🗨️', text: 'Barfoo'},
    ]
  } as Pick<Metadata, 'nickname' | 'realName' | 'descriptionLines'>) as Metadata;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      providers: [
        MockProvider(METADATA, fakeMetadata),
      ]
    });
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display profile picture', () => {
    const profilePic = fixture.debugElement.query(By.css('img.main'));
    expect(profilePic).toBeTruthy();
    expect(profilePic.attributes['ngSrc']).toBeDefined();
    expect(profilePic.attributes['ngSrc']).toContain('profile.png');
  })

  it('should display "huh" profile picture hidden', () => {
    const huhProfilePic = fixture.debugElement.query(By.css('img.huh'));
    expect(huhProfilePic).toBeTruthy();
    expect(huhProfilePic.attributes['ngSrc']).toBeDefined();
    expect(huhProfilePic.attributes['ngSrc']).toContain('profile_huh.png');
    const styles = getComputedStyle(huhProfilePic.nativeElement);
    expect(styles).toBeTruthy();
    expect(styles.opacity).toEqual('0');
  })

  it('should display real name in header', () => {
    const h1 = fixture.debugElement.query(By.css('h1'));
    expect(h1.nativeElement.textContent).toContain(fakeMetadata.realName);
  })

  it('should display nickname preceded by \'@\' in header', () => {
    const h1 = fixture.debugElement.query(By.css('h1'));
    expect(h1.nativeElement.textContent).toContain(`@${fakeMetadata.nickname}`);
  })

  it('should contain description lines as secondary headers', () => {
    const h2s = fixture.debugElement.queryAll(By.css('h2'));
    h2s.forEach((h2, index) => {
      const descriptionLine = fakeMetadata.descriptionLines[index];
      expect(h2.nativeElement.textContent).toEqual(`${descriptionLine.emoji} ${descriptionLine.text}`)
    });
  })
});
