import { NgOptimizedImage } from '@angular/common'
import { NgModule, VERSION } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { SeoModule } from '@ngaox/seo'
import { environment } from '../environments'
import { AboutComponent } from './about/about.component'
import { ContactSocialIconsComponent } from './about/presentation/contact-social-icons/contact-social-icons.component'
import { ContactTraditionalIconsComponent } from './about/presentation/contact-traditional-icons/contact-traditional-icons.component'
import { DescriptionComponent } from './about/presentation/description/description.component'
import { ProfilePictureComponent } from './about/presentation/profile-picture/profile-picture.component'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HeaderComponent } from './header/header.component'
import { JsonldMetadataComponent } from './jsonld-metadata/jsonld-metadata.component'
import { METADATA } from './metadata'
import { NavigationTabsComponent } from './navigation-tabs/navigation-tabs.component'
import { NoScriptComponent } from './no-script/no-script.component'
import { ReleaseInfoComponent } from './release-info/release-info.component'
import { NotFoundComponent } from './not-found/not-found.component'
import { PresentationComponent } from './about/presentation/presentation.component'
import { ExperienceComponent } from './about/experience/experience.component'
import { ExperienceItemComponent } from './about/experience/experience-item/experience-item.component'
import { H2Component } from './about/h2/h2.component'
import { EducationComponent } from './about/education/education.component'
import { EducationItemComponent } from './about/education/education-item/education-item.component'
import { DateRangeComponent } from './about/date-range/date-range.component'
import { CardComponent } from './about/card/card.component'
import { CardHeaderImageComponent } from './about/card/card-header-image/card-header-image.component'
import { CardHeaderTitleComponent } from './about/card/card-header-title/card-header-title.component'
import { LinkComponent } from './about/link/link.component'
import { CardHeaderSubtitleComponent } from './about/card/card-header-subtitle/card-header-subtitle.component'
import { CardHeaderDetailComponent } from './about/card/card-header-detail/card-header-detail.component'
import { TestIdDirective } from './common/test-id.directive'
import { CardHeaderComponent } from './about/card/card-header/card-header.component'

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
    NotFoundComponent,
    PresentationComponent,
    ExperienceComponent,
    ExperienceItemComponent,
    H2Component,
    EducationComponent,
    EducationItemComponent,
    DateRangeComponent,
    CardComponent,
    CardHeaderImageComponent,
    CardHeaderTitleComponent,
    LinkComponent,
    CardHeaderSubtitleComponent,
    CardHeaderDetailComponent,
    TestIdDirective,
    CardHeaderComponent,
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
        mimeType: 'image/jpeg',
      },
      twitter: {
        card: 'summary',
        creator: `@${METADATA.nickname}`,
        site: `@${METADATA.nickname}`,
      },
      siteName: METADATA.siteName,
      extra: [
        { name: 'author', content: METADATA.nickname },
        { property: 'og:locale', content: 'en' },
        { property: 'fb:admins', content: METADATA.nickname },
        { name: 'facebook-domain-verification', content: '1299426610587748' },
        { name: 'generator', content: `Angular ${VERSION.full}` },
        // See more in favicons doc. Related to Internet Explorer / Microsoft metro tiles
        { name: 'application-name', content: METADATA.siteName },
      ],
    }),
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
