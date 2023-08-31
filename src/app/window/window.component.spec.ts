import { EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MockComponents } from 'ng-mocks';
import { ensureHasComponents, getComponentSelector } from '../../test/helpers/component-testers';
import { getSampleFromArray } from '../../test/helpers/random';
import { ContactsComponent } from '../contacts/contacts.component';
import { NavigationTabsComponent, TabId } from '../navigation-tabs/navigation-tabs.component';
import { NoScriptComponent } from '../no-script/no-script.component';
import { ProfileComponent } from '../profile/profile.component';
import { SocialComponent } from '../social/social.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';

import { WindowComponent } from './window.component';

describe('WindowComponent', () => {
  let component: WindowComponent;
  let fixture: ComponentFixture<WindowComponent>;
  let fragment$: EventEmitter<string>;

  beforeEach(() => {
    fragment$ = new EventEmitter<string>();
    TestBed.configureTestingModule({
      declarations: [
        WindowComponent,
        MockComponents(
          ToolbarComponent,
          ProfileComponent,
          NoScriptComponent,
          NavigationTabsComponent,
          ContactsComponent,
          SocialComponent,
        ),
      ],
      providers: [
        {provide: ActivatedRoute, useValue: {fragment: fragment$}},
      ],
    });
    fixture = TestBed.createComponent(WindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  ensureHasComponents(() => fixture,
    ToolbarComponent, ProfileComponent, NavigationTabsComponent, ContactsComponent, SocialComponent,
  );

  describe('when route fragment changes', () => {
    describe('when fragment does not represent a tab', () => {
      it('should do nothing and stay at same tab', () => {
        const defaultTab = component.selectedTab;

        fragment$.emit('definitely-not-a-tab-id')

        expect(component.selectedTab).toEqual(defaultTab);
      })
    })
    describe('when fragment represents a tab', () => {
      it('should update the active tab', () => {
        const defaultTab = component.selectedTab;
        const otherTabs = Object.values(TabId).filter((tabId) => tabId != defaultTab);
        const anotherTab = getSampleFromArray(otherTabs);

        fragment$.emit(anotherTab);

        expect(component.selectedTab).toEqual(anotherTab);

        fixture.detectChanges()
        const navigationTabsElement = fixture.debugElement.query(
          By.css(getComponentSelector(NavigationTabsComponent)),
        )
        expect(navigationTabsElement.attributes['ng-reflect-tab']).toEqual(anotherTab);
      })
    })
  })
});
