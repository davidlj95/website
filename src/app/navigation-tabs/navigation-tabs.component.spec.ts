import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NavigationTabsComponent } from './navigation-tabs.component';

describe('NavigationTabsComponent', () => {
  let component: NavigationTabsComponent;
  let fixture: ComponentFixture<NavigationTabsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavigationTabsComponent]
    });
    fixture = TestBed.createComponent(NavigationTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain all navigation items with their name and link', () => {
    const tabElements = fixture.debugElement.queryAll(By.css('li'))
    expect(tabElements).toHaveSize(component.items.length);
    tabElements.forEach((tabElement, index) => {
      const tabItem = component.items[index];
      expect(tabElement.nativeElement.textContent.trim()).withContext(`Tab ${index} text`).toEqual(tabItem.displayName);
      const link = tabElement.query(By.css('a'));
      expect(link.attributes['href']).withContext(`Tab ${index} link`).toEqual(tabItem.externalUrl ?? `#${tabItem.id}`);
    });
  });

  it('should open external links in new tab', () => {
    const links = fixture.debugElement.queryAll(By.css('a'));
    const externalLinks = links.filter(
      (link) => !!link.attributes['href'] && !link.attributes['href'].startsWith('#')
    )
    externalLinks.forEach((externalLink, index) => {
      expect(externalLink.attributes['target']).withContext(`External link ${index}`).toEqual('_blank');
    });
  })


  it('should not mark unselected tabs as selected', () => {
    const selectedTabElement = fixture.debugElement.query(By.css('li'));
    expect(selectedTabElement.classes['selected']).withContext('does not have selected class').toBeFalsy();
    expect(selectedTabElement.attributes['aria-selected'])
      .withContext('does not have ARIA selected attr').toBe("false");
    expect(selectedTabElement.attributes['tabindex']).withContext('has tabIndex -1').toBe("-1");
  })

  it('should mark the selected tab as selected', () => {
    const selectedTabIndex = 0;
    component.tab = component.items[selectedTabIndex].id;

    fixture.detectChanges();

    const selectedTabElement = fixture.debugElement.query(
      By.css(`li:nth-child(${selectedTabIndex + 1})`)
    );
    expect(selectedTabElement.classes['selected']).withContext('has selected class').toBe(true);
    expect(selectedTabElement.attributes['aria-selected']).withContext('has ARIA selected attr').toBe("true");
    expect(selectedTabElement.attributes['tabindex']).withContext('has tabIndex 0').toBe("0");
  })
});
