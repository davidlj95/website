import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ContactsComponent } from './contacts.component';

describe('ContactsComponent', () => {
  let component: ContactsComponent;
  let fixture: ComponentFixture<ContactsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactsComponent]
    });
    fixture = TestBed.createComponent(ContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render is if it was a JSON object, containing all contacts', () => {
    const jsonText = fixture.debugElement.nativeElement.textContent;
    const jsonTextWithoutNbsp = jsonText.replace(/\u00A0/g, '');
    const parsedJSON = JSON.parse(jsonTextWithoutNbsp);
    component.items.forEach((item) => {
      expect(parsedJSON[item.key]).withContext(`Item ${item.key}`).toEqual(item.value);
    });
  });

  it('should link all values using the URI prefix', () => {
    const valueElements = fixture.debugElement.queryAll(By.css('dd'));
    expect(valueElements).toHaveSize(component.items.length);
    component.items.forEach((item, index) => {
      const valueElement = valueElements[index]
      const anchorElement = valueElement.query(By.css('a'))
      expect(anchorElement.attributes['href']).withContext(`Link ${item.key}`).toEqual(`${item.uriPrefix}${item.value}`)
    })
  })
});
