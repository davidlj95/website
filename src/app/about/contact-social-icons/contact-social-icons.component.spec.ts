import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { MockProvider } from 'ng-mocks';
import { getComponentSelector } from '../../../test/helpers/component-testers';
import { METADATA } from '../../common/injection-tokens';
import { Metadata } from '../../metadata';

import { ContactSocialIconsComponent } from './contact-social-icons.component';

describe('ContactSocialIconsComponent', () => {
  let component: ContactSocialIconsComponent;
  let fixture: ComponentFixture<ContactSocialIconsComponent>;
  const nickname = 'foo';

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContactSocialIconsComponent,
        FaIconComponent,
      ],
      providers: [
        MockProvider(METADATA, {nickname: nickname} as Pick<Metadata, 'nickname'> as Metadata)
      ]
    });
    fixture = TestBed.createComponent(ContactSocialIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#items', () => {
    it('should have the nickname in every url', () => {
      component.items.forEach((item, index) => {
        expect(item.url.pathname).withContext(`item ${index}`).toContain(nickname);
      })
    })
  })

  it('should list all contact methods with their icons and links', () => {
    const itemElements = fixture.debugElement.queryAll(By.css('li'))
    expect(itemElements.length).withContext('same number of items').toBe(component.items.length)
    component.items.forEach((item, index) => {
      const itemElement = itemElements[index];
      const iconElement = itemElement.query(By.css(getComponentSelector(FaIconComponent)));
      expect(getIconNameFromFontAwesomeElement(iconElement)).withContext(`item ${index} icon`).toEqual(item.icon.iconName);

      const anchorElement = itemElement.query(By.css('a'));
      expect(anchorElement).withContext(`item ${index} link exists`).toBeTruthy();
      expect(anchorElement.attributes['href']).withContext(`item ${index} link URL`).toEqual(item.url.toString());
    })
  })

  function getIconNameFromFontAwesomeElement(faElement: DebugElement): string {
    return faElement.children[0].nativeElement.getAttribute('data-icon')
  }
});
