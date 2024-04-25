import { Routes } from '@angular/router'
import { routes as notFoundPageRoutes } from './not-found-page/routes'
import { routes as resumePageRoutes } from './resume-page/routes'

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
  //   url: environment.canonicalUrl.toString(),
  // },
  ...resumePageRoutes,
  ...notFoundPageRoutes,
]
