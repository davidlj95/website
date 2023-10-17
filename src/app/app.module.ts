import { NgOptimizedImage } from '@angular/common'
import { NgModule, VERSION } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { SeoModule } from '@ngaox/seo'
import { environment } from '../environments'

import { ResumePageComponent } from './resume-page/resume-page.component'
import { ProfileContactSocialIconsComponent } from './resume-page/profile/profile-contact-social-icons/profile-contact-social-icons.component'
import { ProfileContactTraditionalIconsComponent } from './resume-page/profile/profile-contact-traditional-icons/profile-contact-traditional-icons.component'
import { ProfileDescriptionComponent } from './resume-page/profile/profile-description/profile-description.component'
import { ProfilePictureComponent } from './resume-page/profile/profile-picture/profile-picture.component'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HeaderComponent } from './header/header.component'
import { JsonldMetadataComponent } from './jsonld-metadata/jsonld-metadata.component'
import { METADATA } from './metadata'
import { NavigationTabsComponent } from './navigation-tabs/navigation-tabs.component'
import { NoScriptComponent } from './no-script/no-script.component'
import { ReleaseInfoComponent } from './release-info/release-info.component'
import { NotFoundPageComponent } from './not-found-page/not-found-page.component'
import { ProfileComponent } from './resume-page/profile/profile.component'
import { ExperienceComponent } from './resume-page/experience/experience.component'
import { ExperienceItemComponent } from './resume-page/experience/experience-item/experience-item.component'
import { H2Component } from './resume-page/h2/h2.component'
import { EducationComponent } from './resume-page/education/education.component'
import { EducationItemComponent } from './resume-page/education/education-item/education-item.component'
import { DateRangeComponent } from './resume-page/date-range/date-range.component'
import { CardComponent } from './resume-page/card/card.component'
import { CardHeaderImageComponent } from './resume-page/card/card-header/card-header-image/card-header-image.component'
import { CardHeaderTitleComponent } from './resume-page/card/card-header/card-header-title/card-header-title.component'
import { LinkComponent } from './resume-page/link/link.component'
import { CardHeaderSubtitleComponent } from './resume-page/card/card-header/card-header-subtitle/card-header-subtitle.component'
import { CardHeaderDetailComponent } from './resume-page/card/card-header/card-header-detail/card-header-detail.component'
import { TestIdDirective } from './common/test-id.directive'
import { CardHeaderComponent } from './resume-page/card/card-header/card-header.component'
import { CardHeaderTextsComponent } from './resume-page/card/card-header/card-header-texts/card-header-texts.component'
import { CardHeaderAttributesComponent } from './resume-page/card/card-header/card-header-attributes/card-header-attributes.component'
import { AttributeComponent } from './resume-page/attribute/attribute.component'
import { ChipComponent } from './resume-page/chip/chip.component'
import { ChippedContentComponent } from './resume-page/chipped-content/chipped-content.component'
import { ExperienceItemSummaryComponent } from './resume-page/experience/experience-item/experience-item-summary/experience-item-summary.component'
import { ExperienceItemHighlightsComponent } from './resume-page/experience/experience-item/experience-item-highlights/experience-item-highlights.component'
import { MaterialSymbolDirective } from './common/material-symbol.directive'
import { EducationItemScoreComponent } from './resume-page/education/education-item/education-item-score/education-item-score.component'
import { EducationItemCoursesComponent } from './resume-page/education/education-item/education-item-courses/education-item-courses.component'
import { ProjectsComponent } from './resume-page/projects/projects.component'
import { ProjectItemComponent } from './resume-page/projects/project-item/project-item.component'
import { ProjectItemDescriptionComponent } from './resume-page/projects/project-item/project-item-description/project-item-description.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ResumePageComponent,
    NoScriptComponent,
    NavigationTabsComponent,
    JsonldMetadataComponent,
    ReleaseInfoComponent,
    ProfilePictureComponent,
    ProfileContactTraditionalIconsComponent,
    ProfileContactSocialIconsComponent,
    ProfileDescriptionComponent,
    NotFoundPageComponent,
    ProfileComponent,
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
    CardHeaderTextsComponent,
    CardHeaderAttributesComponent,
    AttributeComponent,
    ChipComponent,
    ChippedContentComponent,
    ExperienceItemSummaryComponent,
    ExperienceItemHighlightsComponent,
    MaterialSymbolDirective,
    EducationItemScoreComponent,
    EducationItemCoursesComponent,
    ProjectsComponent,
    ProjectItemComponent,
    ProjectItemDescriptionComponent,
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
