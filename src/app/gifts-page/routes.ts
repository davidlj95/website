import { Routes } from '@angular/router'
import { NgxMetaRouteData } from '@davidlj95/ngx-meta/routing'
import { GlobalMetadata } from '@davidlj95/ngx-meta/core'
import { METADATA } from '@/data/metadata'
import { GIFTS_PATH } from './gifts-page.routes'
import { GiftsPageComponent } from './gifts-page.component'

export const routes: Routes = [
  {
    path: '',
    component: GiftsPageComponent,
    data: {
      meta: {
        title: `🎁 Gifts | ${METADATA.nickname}`,
        description:
          "If you want to give me a gift, here's the page to help you out. Thanks in advance by the way. Much appreciated ❤️",
        canonicalUrl: GIFTS_PATH,
      },
    } satisfies NgxMetaRouteData<GlobalMetadata>,
  },
]
