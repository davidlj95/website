import { Routes } from '@angular/router'
import { ResumePageComponent } from './resume-page/resume-page.component'
import { METADATA } from './metadata'
import { environment } from '../environments'
import { routes as notFoundPageRoutes } from './not-found-page/routes'

const RESUME_PATH = 'resume'

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
  { path: '', redirectTo: `/${RESUME_PATH}`, pathMatch: 'full' },
  {
    path: RESUME_PATH,
    component: ResumePageComponent,
    data: {
      meta: {
        title: `${METADATA.siteName} | Resume`,
        canonicalUrl: new URL(RESUME_PATH, environment.canonicalUrl),
        description: METADATA.description,
        image: {
          url: new URL('assets/img/og.jpg', environment.canonicalUrl),
          alt: `A portrait of ${METADATA.realName}. Slightly smiling and wearing geek-ish glasses`,
        },
        standard: {
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
        },
        openGraph: {
          image: {
            width: 875,
            height: 875,
          },
        },
      },
    },
  },
  ...notFoundPageRoutes,
]
