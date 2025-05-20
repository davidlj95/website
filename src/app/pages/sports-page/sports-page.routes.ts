import { Routes } from '@angular/router'

export const SPORTS_PATH = 'sports'
const SPORTS_PATHS = [SPORTS_PATH, '👟', '🎾', '🏃']
export const sportsPageRoutes: Routes = [
  ...SPORTS_PATHS.map((path) => ({
    path,
    loadChildren: () => import('./routes').then((m) => m.routes),
  })),
]
