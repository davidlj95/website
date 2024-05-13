import { Routes } from '@angular/router'
import { CalendarPageComponent } from './calendar-page.component'
import { NgxMetaRouteData } from '@davidlj95/ngx-meta/routing'
import { GlobalMetadata } from '@davidlj95/ngx-meta/core'
import { METADATA } from '../metadata'
import { CALENDAR_PATH } from './external-routes'
import { environment } from '../../environments'

export const routes: Routes = [
  {
    path: '',
    component: CalendarPageComponent,
    data: {
      meta: {
        title: `📅 Calendar | ${METADATA.nickname}`,
        description: "Book an appointment with me here. Let's hang out!",
        canonicalUrl: new URL(CALENDAR_PATH + '/', environment.appBaseUrl),
      },
    } satisfies NgxMetaRouteData<GlobalMetadata>,
  },
]
