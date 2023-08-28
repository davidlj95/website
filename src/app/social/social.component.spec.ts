import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { getSafeValueContent } from '../../test/helpers/sanitizer';

import { SocialComponent } from './social.component';

describe('SocialComponent', () => {
  let component: SocialComponent;
  let fixture: ComponentFixture<SocialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SocialComponent]
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

      const svg = socialElement.query(By.css('svg'))
      const svgContent = getSafeValueContent(socialItem.svg);
      // Grabbing first chars only as ending <path> s are rendered differently than in source
      const svgSliceSize = 40;
      expect(svg.nativeElement.outerHTML.slice(0, svgSliceSize))
        .withContext(`Social logo ${index}`)
        .toEqual(svgContent.slice(0, svgSliceSize));
    });
  })
});
