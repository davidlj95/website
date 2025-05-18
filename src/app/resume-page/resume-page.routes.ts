import { ResumePageComponent } from './resume-page.component'
import { METADATA } from '@/data/metadata'
import { environment } from '../../environments'
import { Routes } from '@angular/router'
import { PlainResumeComponent } from './plain-resume/plain-resume.component'

export const RESUME_PATH = 'resume'
const RESUME_PLAIN_PATH = 'plain'
const data = {
  meta: {
    title: `📄 Resume`,
    canonicalUrl: RESUME_PATH,
    description: METADATA.description,
    image: {
      url: new URL('images/misc/og.jpg', environment.appBaseUrl),
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
}

export const resumePageRoutes: Routes = [
  { path: '', redirectTo: `/${RESUME_PATH}`, pathMatch: 'full' },
  {
    path: `${RESUME_PATH}/${RESUME_PLAIN_PATH}`,
    component: PlainResumeComponent,
    data,
  },
  {
    path: RESUME_PATH,
    component: ResumePageComponent,
    data,
  },
]
