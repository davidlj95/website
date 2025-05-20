import { RESUME_PATH } from '../pages/resume-page/resume-page.routes'
import { CALENDAR_PATH } from '../pages/calendar-page/calendar-page.routes'
import { SPORTS_PATH } from '../pages/sports-page/sports-page.routes'
import { GIFTS_PATH } from '../pages/gifts-page/gifts-page.routes'
import { NavigationItem } from './navigation-tabs/navigation-tabs.component'

export const NAVIGATION_ITEMS: readonly NavigationItem[] = [
  { displayName: 'Resume', routerLink: RESUME_PATH },
  { displayName: 'Calendar', routerLink: CALENDAR_PATH },
  { displayName: 'Sports', routerLink: SPORTS_PATH },
  { displayName: 'Gifts', routerLink: GIFTS_PATH },
]
