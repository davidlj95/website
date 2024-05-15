import { Routes } from '@angular/router'
import { NgxMetaRouteData } from '@davidlj95/ngx-meta/routing'
import { GlobalMetadata } from '@davidlj95/ngx-meta/core'
import { METADATA } from '../metadata'
import { SPORTS_PATH } from './sports-page.routes'
import { environment } from '../../environments'
import { SportsPageComponent } from './sports-page.component'

export const routes: Routes = [
  {
    path: '',
    component: SportsPageComponent,
    data: {
      meta: {
        title: `👟 Sports | ${METADATA.nickname}`,
        description: "Let's play some padel! Or go running together 🏃",
        canonicalUrl: new URL(SPORTS_PATH + '/', environment.appBaseUrl),
      },
    } satisfies NgxMetaRouteData<GlobalMetadata>,
  },
]
