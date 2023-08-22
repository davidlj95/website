import { EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { MockComponents } from 'ng-mocks';
import { ensureHasComponents } from '../../../test/helpers';
import { ContactsComponent } from '../contacts/contacts.component';
import { NavigationTabsComponent } from '../navigation-tabs/navigation-tabs.component';
import { NoScriptComponent } from '../no-script/no-script.component';
import { ProfileComponent } from '../profile/profile.component';
import { SocialComponent } from '../social/social.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';

import { WindowComponent } from './window.component';

describe('WindowComponent', () => {
  let component: WindowComponent;
  let fixture: ComponentFixture<WindowComponent>;

  beforeEach(() => {
    const fragment$ = new EventEmitter<String>();
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
        {provide: ActivatedRoute, useValue: {fragment: fragment$}}
      ]
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
});
