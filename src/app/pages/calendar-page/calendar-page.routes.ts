import { Routes } from '@angular/router'

export const CALENDAR_PATH = 'calendar'
const CALENDAR_PATHS = [CALENDAR_PATH, '📅', '🗓️', '📆']
export const calendarPageRoutes: Routes = [
  ...CALENDAR_PATHS.map((path) => ({
    path,
    loadChildren: () => import('./routes').then((m) => m.routes),
  })),
]
