import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ContactTraditionalIconsComponent } from './contact-traditional-icons.component';

describe('ContactTraditionalIconsComponent', () => {
  let component: ContactTraditionalIconsComponent;
  let fixture: ComponentFixture<ContactTraditionalIconsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactTraditionalIconsComponent]
    });
    fixture = TestBed.createComponent(ContactTraditionalIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should list all contact methods with their icons and links', () => {
    const itemElements = fixture.debugElement.queryAll(By.css('li'))
    expect(itemElements.length).withContext('same number of items').toBe(component.items.length)
    component.items.forEach((item, index) => {
      const itemElement = itemElements[index];
      const iconText = itemElement.nativeElement.textContent;
      expect(iconText).withContext(`item ${index} icon`).toEqual(item.icon);

      const anchorElement = itemElement.query(By.css('a'));
      expect(anchorElement).withContext(`item ${index} link exists`).toBeTruthy();
      expect(anchorElement.attributes['href']).withContext(`item ${index} link URL`).toEqual(item.url.toString());
    })
  })
});
