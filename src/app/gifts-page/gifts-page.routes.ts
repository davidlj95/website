import { Routes } from '@angular/router'

export const GIFTS_PATH = 'gifts'
const GIFTS_PATHS = [GIFTS_PATH, '🎁', '🧧']
export const giftsPageRoutes: Routes = [
  ...GIFTS_PATHS.map((path) => ({
    path,
    loadChildren: () => import('./routes').then((m) => m.routes),
  })),
]
