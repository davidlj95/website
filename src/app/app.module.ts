import { NgOptimizedImage } from '@angular/common';
import { NgModule, VERSION } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SeoModule } from "@ngaox/seo";
import { environment } from '../environments';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactsComponent } from './contacts/contacts.component';
import { JsonldMetadataComponent } from './jsonld-metadata/jsonld-metadata.component';
import { METADATA } from './metadata';
import { NavigationTabsComponent } from './navigation-tabs/navigation-tabs.component';
import { NoScriptComponent } from './no-script/no-script.component';
import { ProfileComponent } from './profile/profile.component';
import { ReleaseInfoComponent } from './release-info/release-info.component';
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
    ReleaseInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    SeoModule.forRoot({
      title: METADATA.siteName,
      keywords: `${METADATA.nickname}, website, ${METADATA.realName}, portfolio, cv, resume, projects, info, contact`,
      description: METADATA.description,
      url: environment.canonicalUrl.toString(),
      type: 'website',
      image: {
        url: new URL('assets/img/og.jpg', environment.canonicalUrl).toString(),
        alt: `A portrait of ${METADATA.realName}. Slightly smiling and wearing geek-ish glasses`,
        width: 875,
        height: 875,
        // I wouldn't set it, but if I don't set it, then it appears as "undefined" :(
        mimeType: "image/jpeg",
      },
      twitter: {
        card: 'summary',
        creator: `@${METADATA.nickname}`,
        site: `@${METADATA.nickname}`,
      },
      siteName: METADATA.siteName,
      extra: [
        {name: 'author', content: METADATA.nickname},
        {property: 'og:locale', content: 'en'},
        {property: 'fb:admins', content: METADATA.nickname},
        {name: 'facebook-domain-verification', content: '1299426610587748'},
        {name: 'generator', content: `Angular ${VERSION.full}`},
        // See more in favicons doc. Related to Internet Explorer / Microsoft metro tiles
        {name: 'application-name', content: METADATA.siteName},
      ],
    }),
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
