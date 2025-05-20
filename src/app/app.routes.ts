import { Routes } from '@angular/router'
import { notFoundPageRoutes } from './pages/not-found-page/not-found-page.routes'
import { resumePageRoutes } from './pages/resume-page/resume-page.routes'
import { calendarPageRoutes } from './pages/calendar-page/calendar-page.routes'
import { giftsPageRoutes } from './pages/gifts-page/gifts-page.routes'
import { sportsPageRoutes } from './pages/sports-page/sports-page.routes'

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
  ...sportsPageRoutes,
  ...notFoundPageRoutes,
]
