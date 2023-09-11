import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockProvider } from 'ng-mocks';
import { MATERIAL_SYMBOLS_CLASS_SELECTOR } from '../../test/constants';
import { METADATA } from '../common/injection-tokens';
import { Metadata } from '../metadata';

import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  const fakeMetadata: Metadata = ({
    nickname: 'bar',
    realName: 'Foo',
    descriptionLines: [
      {symbol: 'code', text: 'Foo bar'},
      {symbol: 'code', text: 'Bar foo'},
    ],
  } as Pick<Metadata, 'nickname' | 'realName' | 'descriptionLines'>) as Metadata;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      providers: [
        MockProvider(METADATA, fakeMetadata),
      ],
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

  it('should contain description lines with symbol as a Material Symbol', () => {
    const h2s = fixture.debugElement.queryAll(By.css('h2'));
    h2s.forEach((h2, index) => {
      const descriptionLine = fakeMetadata.descriptionLines[index];
      const materialSymbolSpan = h2.query(MATERIAL_SYMBOLS_CLASS_SELECTOR)
      expect(materialSymbolSpan.nativeElement.textContent).toEqual(descriptionLine.symbol)
    });
  })

  it('should contain description lines with text', () => {
    const h2s = fixture.debugElement.queryAll(By.css('h2'));
    h2s.forEach((h2, index) => {
      const descriptionLine = fakeMetadata.descriptionLines[index];
      const textSpan = h2.query(By.css('span:nth-child(2)'))
      expect(textSpan.nativeElement.textContent).toEqual(descriptionLine.text)
    });
  })
});
