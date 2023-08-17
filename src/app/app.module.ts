import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgOptimizedImage } from "@angular/common";
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ProfileComponent } from './profile/profile.component';
import { NoScriptComponent } from './no-script/no-script.component';
import { ContactsComponent } from './contacts/contacts.component';
import { SocialComponent } from './social/social.component';
import { NavigationTabsComponent } from './navigation-tabs/navigation-tabs.component';
import { WindowComponent } from './window/window.component';
import { SeoModule } from "@ngaox/seo";

const nickname = 'davidlj95';
const realname = 'David LJ';
const siteName = `${realname} 🔗 @${nickname}`;

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    SeoModule.forRoot({
      title: siteName,
      keywords: `${nickname}, website, ${realname}, portfolio, cv, resume, projects, info, contact`,
      description: '/dev/random software engineer. Connecting technology &amp; RealLife™. Padel frequent player. Get to know me better here',
      url: `https://v2.${nickname}.com/`,
      type: 'website',
      image: {
        url: `https://${nickname}.com/assets/img/og.jpg`,
        alt: `A portrait of ${realname}. Slightly smiling and wearing geek'ish glasses`,
        width: 875,
        height: 875,
        // mimeType: "Not setting it. So you can change the image without needing to worry about updating this l8r",
      },
      twitter: {
        card: 'summary',
        creator: `@${nickname}`,
        site: `@${nickname}`,
      },
      siteName: siteName,
      extra: [
        {name: 'author', content: nickname,},
        {property: 'og:locale', content: 'en',},
        {property: 'fb:admins', content: nickname,},
        {name: 'facebook-domain-verification', content: '1299426610587748'}
      ]
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
