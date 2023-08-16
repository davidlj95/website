import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgOptimizedImage } from "@angular/common";
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ProfileComponent } from './profile/profile.component';
import { NoScriptComponent } from './no-script/no-script.component';
import { ContactsComponent } from './contacts/contacts.component';
import { SocialNetworksComponent } from './social-networks/social-networks.component';
import { NavigationTabsComponent } from './navigation-tabs/navigation-tabs.component';
import { WindowComponent } from './window/window.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    ProfileComponent,
    NoScriptComponent,
    ContactsComponent,
    SocialNetworksComponent,
    NavigationTabsComponent,
    WindowComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
