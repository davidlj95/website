import { NgOptimizedImage } from '@angular/common'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { environment } from '../environments'

import { ResumePageComponent } from './resume-page/resume-page.component'
import { ProfileContactSocialIconsComponent } from './resume-page/profile-section/profile-contact-social-icons/profile-contact-social-icons.component'
import { ProfileContactTraditionalIconsComponent } from './resume-page/profile-section/profile-contact-traditional-icons/profile-contact-traditional-icons.component'
import { ProfileDescriptionComponent } from './resume-page/profile-section/profile-description/profile-description.component'
import { ProfilePictureComponent } from './resume-page/profile-section/profile-picture/profile-picture.component'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HeaderComponent } from './header/header.component'
import { JsonldMetadataComponent } from './resume-page/jsonld-metadata/jsonld-metadata.component'
import { METADATA } from './metadata'
import { NavigationTabsComponent } from './navigation-tabs/navigation-tabs.component'
import { NoScriptComponent } from './no-script/no-script.component'
import { ReleaseInfoComponent } from './release-info/release-info.component'
import { NotFoundPageComponent } from './not-found-page/not-found-page.component'
import { ProfileSectionComponent } from './resume-page/profile-section/profile-section.component'
import { ExperienceSectionComponent } from './resume-page/experience-section/experience-section.component'
import { ExperienceItemComponent } from './resume-page/experience-section/experience-item/experience-item.component'
import { H2Component } from './resume-page/h2/h2.component'
import { EducationSectionComponent } from './resume-page/education-section/education-section.component'
import { EducationItemComponent } from './resume-page/education-section/education-item/education-item.component'
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
import { ExperienceItemSummaryComponent } from './resume-page/experience-section/experience-item/experience-item-summary/experience-item-summary.component'
import { ExperienceItemHighlightsComponent } from './resume-page/experience-section/experience-item/experience-item-highlights/experience-item-highlights.component'
import { MaterialSymbolDirective } from './common/material-symbol.directive'
import { EducationItemScoreComponent } from './resume-page/education-section/education-item/education-item-score/education-item-score.component'
import { EducationItemCoursesComponent } from './resume-page/education-section/education-item/education-item-courses/education-item-courses.component'
import { ProjectsSectionComponent } from './resume-page/projects-section/projects-section.component'
import { ProjectItemComponent } from './resume-page/projects-section/project-item/project-item.component'
import { ProjectItemDescriptionComponent } from './resume-page/projects-section/project-item/project-item-description/project-item-description.component'
import { GlobalMetadata, NgxMetaCoreModule } from '@davidlj95/ngx-meta/core'
import { NgxMetaRoutingModule } from '@davidlj95/ngx-meta/routing'
import {
  NgxMetaStandardModule,
  StandardMetadata,
} from '@davidlj95/ngx-meta/standard'
import {
  NgxMetaOpenGraphModule,
  OPEN_GRAPH_TYPE_WEBSITE,
  OpenGraphMetadata,
} from '@davidlj95/ngx-meta/open-graph'
import {
  NgxMetaTwitterCardModule,
  TWITTER_CARD_TYPE_SUMMARY,
  TwitterCardMetadata,
} from '@davidlj95/ngx-meta/twitter-card'

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
    ProfileSectionComponent,
    ExperienceSectionComponent,
    ExperienceItemComponent,
    H2Component,
    EducationSectionComponent,
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
    ProjectsSectionComponent,
    ProjectItemComponent,
    ProjectItemDescriptionComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgOptimizedImage,
    NgxMetaCoreModule.forRoot({
      defaults: {
        title: METADATA.siteName,
        description: METADATA.description,
        image: {
          url: new URL('assets/img/og.jpg', environment.canonicalUrl),
          alt: `A portrait of ${METADATA.realName}. Slightly smiling and wearing geek-ish glasses`,
        },
        locale: 'en',
        // TODO: @davidlj95/ngx-meta tries to merge default canonical URL + route canonical URL
        //       With spread operator. Result: messed up canonical URL and `[object Object]` in your URLs :')
        // canonicalUrl: environment.canonicalUrl,
        applicationName: METADATA.siteName,
        standard: {
          author: METADATA.nickname,
          keywords: [
            METADATA.nickname,
            'website',
            METADATA.realName,
            'portfolio',
            'cv',
            'resume',
            'projects',
            'info',
            'contact',
          ],
          generator: true,
        },
        openGraph: {
          type: OPEN_GRAPH_TYPE_WEBSITE,
          image: {
            width: 875,
            height: 875,
            // I wouldn't set it, but if I don't set it, then it appears as "undefined" :(
            type: 'image/jpeg',
          },
        },
        twitterCard: {
          card: TWITTER_CARD_TYPE_SUMMARY,
          creator: { username: METADATA.twitterUsername },
          site: {
            username: METADATA.twitterUsername,
          },
        },
        // TODO: Add them into `@davidlj95/ngx-meta`
        // https://github.com/davidlj95/ngx/discussions/422
        //extra: [
        //  { property: 'fb:admins', content: METADATA.nickname },
        //  { name: 'facebook-domain-verification', content: '1299426610587748' },
        //],
      } satisfies GlobalMetadata &
        StandardMetadata &
        OpenGraphMetadata &
        TwitterCardMetadata,
    }),
    NgxMetaRoutingModule.forRoot(),
    NgxMetaStandardModule,
    NgxMetaOpenGraphModule,
    NgxMetaTwitterCardModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
