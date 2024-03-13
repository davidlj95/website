import { NgOptimizedImage } from '@angular/common'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import { ResumePageComponent } from './resume-page/resume-page.component'
import { ProfileContactSocialIconsComponent } from './resume-page/profile-section/profile-contact-social-icons/profile-contact-social-icons.component'
import { ProfileContactTraditionalIconsComponent } from './resume-page/profile-section/profile-contact-traditional-icons/profile-contact-traditional-icons.component'
import { ProfileDescriptionComponent } from './resume-page/profile-section/profile-description/profile-description.component'
import { ProfilePictureComponent } from './resume-page/profile-section/profile-picture/profile-picture.component'
import { AppComponent } from './app.component'
import { HeaderComponent } from './header/header.component'
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
import { NgxMetaCoreModule } from '@davidlj95/ngx-meta/core'
import { NgxMetaRoutingModule } from '@davidlj95/ngx-meta/routing'
import { NgxMetaStandardModule } from '@davidlj95/ngx-meta/standard'
import { NgxMetaOpenGraphModule } from '@davidlj95/ngx-meta/open-graph'
import { NgxMetaTwitterCardModule } from '@davidlj95/ngx-meta/twitter-card'
import { METADATA_DEFAULTS } from './app.metadata-defaults'
import {
  provideRouter,
  RouterModule,
  withEnabledBlockingInitialNavigation,
} from '@angular/router'
import { routes } from './app.routes'

export const APP_MODULE_METADATA_IMPORTS = [
  NgxMetaCoreModule.forRoot({
    defaults: METADATA_DEFAULTS,
  }),
  NgxMetaRoutingModule.forRoot(),
  NgxMetaStandardModule,
  NgxMetaOpenGraphModule,
  NgxMetaTwitterCardModule,
]
