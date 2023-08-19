import { NgOptimizedImage } from '@angular/common';
import { NgModule, VERSION } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SeoModule } from "@ngaox/seo";
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactsComponent } from './contacts/contacts.component';
import { JsonldMetadataComponent } from './jsonld-metadata/jsonld-metadata.component';
import { DESCRIPTION, NICKNAME, REAL_NAME, SITE_NAME } from './metadata';
import { NavigationTabsComponent } from './navigation-tabs/navigation-tabs.component';
import { NoScriptComponent } from './no-script/no-script.component';
import { ProfileComponent } from './profile/profile.component';
import { SocialComponent } from './social/social.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { WindowComponent } from './window/window.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    ProfileComponent,
    NoScriptComponent,
    ContactsComponent,
    SocialComponent,
    NavigationTabsComponent,
    WindowComponent,
    JsonldMetadataComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    SeoModule.forRoot({
      title: SITE_NAME,
      keywords: `${NICKNAME}, website, ${REAL_NAME}, portfolio, cv, resume, projects, info, contact`,
      description: DESCRIPTION,
      url: environment.canonicalUrl.toString(),
      type: 'website',
      image: {
        url: new URL('assets/img/og.jpg', environment.canonicalUrl).toString(),
        alt: `A portrait of ${REAL_NAME}. Slightly smiling and wearing geek'ish glasses`,
        width: 875,
        height: 875,
        // mimeType: "Not setting it. So you can change the image without needing to worry about updating this l8r",
      },
      twitter: {
        card: 'summary',
        creator: `@${NICKNAME}`,
        site: `@${NICKNAME}`,
      },
      siteName: SITE_NAME,
      extra: [
        {name: 'author', content: NICKNAME,},
        {property: 'og:locale', content: 'en',},
        {property: 'fb:admins', content: NICKNAME,},
        {name: 'facebook-domain-verification', content: '1299426610587748'},
        {name: 'generator', content: `Angular ${VERSION.full}`}
      ]
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
