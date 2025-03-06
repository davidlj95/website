import { Routes } from '@angular/router'
import { CalendarPageComponent } from './calendar-page.component'
import { NgxMetaRouteData } from '@davidlj95/ngx-meta/routing'
import { GlobalMetadata } from '@davidlj95/ngx-meta/core'
import { METADATA } from '@/data/metadata'
import { CALENDAR_PATH } from './calendar-page.routes'

export const routes: Routes = [
  {
    path: '',
    component: CalendarPageComponent,
    data: {
      meta: {
        title: `📅 Calendar | ${METADATA.nickname}`,
        description: "Book an appointment with me here. Let's hang out!",
        canonicalUrl: CALENDAR_PATH,
      },
    } satisfies NgxMetaRouteData<GlobalMetadata>,
  },
]
