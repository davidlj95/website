import { RESUME_PATH } from '../resume-page/resume-page.routes'
import { CALENDAR_PATH } from '../calendar-page/calendar-page.routes'
import { SPORTS_PATH } from '../sports-page/sports-page.routes'
import { GIFTS_PATH } from '../gifts-page/gifts-page.routes'
import { NavigationItem } from './navigation-tabs/navigation-tabs.component'

export const NAVIGATION_ITEMS: ReadonlyArray<NavigationItem> = [
  { displayName: 'Resume', routerLink: RESUME_PATH },
  { displayName: 'Calendar', routerLink: CALENDAR_PATH },
  { displayName: 'Sports', routerLink: SPORTS_PATH },
  { displayName: 'Gifts', routerLink: GIFTS_PATH },
]
