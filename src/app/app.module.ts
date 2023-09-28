import { NgOptimizedImage } from '@angular/common';
import { NgModule, VERSION } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SeoModule } from "@ngaox/seo";
import { environment } from '../environments';
import { AboutComponent } from './about/about.component';
import { ContactSocialIconsComponent } from './about/contact-social-icons/contact-social-icons.component';
import {
  ContactTraditionalIconsComponent,
} from './about/contact-traditional-icons/contact-traditional-icons.component';
import { DescriptionComponent } from './about/description/description.component';
import { ProfilePictureComponent } from './about/profile-picture/profile-picture.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { JsonldMetadataComponent } from './jsonld-metadata/jsonld-metadata.component';
import { METADATA } from './metadata';
import { NavigationTabsComponent } from './navigation-tabs/navigation-tabs.component';
import { NoScriptComponent } from './no-script/no-script.component';
import { ReleaseInfoComponent } from './release-info/release-info.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AboutComponent,
    NoScriptComponent,
    NavigationTabsComponent,
    JsonldMetadataComponent,
    ReleaseInfoComponent,
    ProfilePictureComponent,
    ContactTraditionalIconsComponent,
    ContactSocialIconsComponent,
    DescriptionComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
