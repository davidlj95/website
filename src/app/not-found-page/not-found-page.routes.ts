import { Route, Routes } from '@angular/router'
import { NgxMetaRouteData } from '@davidlj95/ngx-meta/routing'
import { GlobalMetadata } from '@davidlj95/ngx-meta/core'
import { StandardMetadata } from '@davidlj95/ngx-meta/standard'
import { TwitterCardMetadata } from '@davidlj95/ngx-meta/twitter-card'
import { METADATA } from '../metadata'

const NOT_FOUND_ROUTE_TEMPLATE: Route = {
  loadComponent: () =>
    import('./not-found-page.component').then((m) => m.NotFoundPageComponent),
  data: {
    meta: {
      title: `Not Found | ${METADATA.nickname}`,
      description: 'Page could not be found',
      standard: {
        author: null,
      },
      twitterCard: {
        creator: { username: null },
        site: { username: null },
      },
    },
  } satisfies NgxMetaRouteData<
    GlobalMetadata & StandardMetadata & TwitterCardMetadata
  >,
}
export const notFoundPageRoutes: Routes = [
  { path: '404', ...NOT_FOUND_ROUTE_TEMPLATE },
  { path: '**', ...NOT_FOUND_ROUTE_TEMPLATE },
]
