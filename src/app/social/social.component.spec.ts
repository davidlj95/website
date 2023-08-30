import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { getComponentSelector } from '../../test/helpers/component-testers';

import { SocialComponent } from './social.component';

describe('SocialComponent', () => {
  let component: SocialComponent;
  let fixture: ComponentFixture<SocialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FontAwesomeTestingModule],
      declarations: [
        SocialComponent,
      ],
    });
    fixture = TestBed.createComponent(SocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display all items with their names, logos and links', () => {
    const socialElements = fixture.debugElement.queryAll(By.css('li'))
    expect(socialElements).toHaveSize(component.items.length)
    socialElements.forEach((socialElement, index) => {
      const socialItem = component.items[index];

      expect(socialElement.nativeElement.textContent.trim())
        .withContext(`Social name ${index}`)
        .toEqual(socialItem.name);

      const link = socialElement.query(By.css('a'))
      expect(link.attributes['href']).withContext(`Social link ${index}`).toEqual(socialItem.url);

      const icon = socialElement.query(By.css(getComponentSelector(FaIconComponent)));
      expect(getIconNameFromFontAwesomeElement(icon)).withContext(`Social icon ${index}`).toEqual(socialItem.icon.iconName);
    });
  })

  function getIconNameFromFontAwesomeElement(faElement: DebugElement): string {
    return faElement.children[0].nativeElement.getAttribute('data-icon')
  }
});
