import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ProfilePictureComponent } from './profile-picture.component';

describe('ProfilePictureComponent', () => {
  let component: ProfilePictureComponent;
  let fixture: ComponentFixture<ProfilePictureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilePictureComponent]
    });
    fixture = TestBed.createComponent(ProfilePictureComponent);
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
});
