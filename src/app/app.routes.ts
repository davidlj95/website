import { Routes } from '@angular/router'
import { notFoundPageRoutes } from './not-found-page/not-found-page.routes'
import { resumePageRoutes } from './resume-page/resume-page.routes'
import { calendarPageRoutes } from './calendar-page/calendar-page.routes'
import { giftsPageRoutes } from './gifts-page/gifts-page.routes'

export const routes: Routes = [
  // Metadata to add when '/' route is ready
  // jsonLd: {
  //   '@context': 'https://schema.org',
  //   '@type': 'WebSite',
  //   author: {
  //     '@type': 'Person',
  //     name: METADATA.realName,
  //     url: METADATA.authorUrl,
  //   },
  //   name: METADATA.siteName,
  //   headline: METADATA.description,
  //   url: environment.appBaseUrl.toString(),
  // },
  ...resumePageRoutes,
  ...calendarPageRoutes,
  ...giftsPageRoutes,
  ...notFoundPageRoutes,
]
