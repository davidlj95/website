import { Routes } from '@angular/router'
import { NgxMetaRouteData } from '@davidlj95/ngx-meta/routing'
import { GlobalMetadata } from '@davidlj95/ngx-meta/core'
import { METADATA } from '@/data/metadata'
import { SPORTS_PATH } from './sports-page.routes'
import { SportsPageComponent } from './sports-page.component'

export const routes: Routes = [
  {
    path: '',
    component: SportsPageComponent,
    data: {
      meta: {
        title: `👟 Sports | ${METADATA.nickname}`,
        description: "Let's play some padel! Or go running together 🏃",
        canonicalUrl: SPORTS_PATH,
      },
    } satisfies NgxMetaRouteData<GlobalMetadata>,
  },
]
