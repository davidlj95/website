import { ResumePageComponent } from './resume-page.component'
import { METADATA } from '../metadata'
import { environment } from '../../environments'
import { Routes } from '@angular/router'

const RESUME_PATH = 'resume'
export const resumePageRoutes: Routes = [
  { path: '', redirectTo: `/${RESUME_PATH}`, pathMatch: 'full' },
  {
    path: RESUME_PATH,
    component: ResumePageComponent,
    data: {
      meta: {
        title: `Resume | ${METADATA.nickname}`,
        canonicalUrl: new URL(RESUME_PATH, environment.appBaseUrl),
        description: METADATA.description,
        image: {
          url: new URL('assets/img/og.jpg', environment.appBaseUrl),
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
]
