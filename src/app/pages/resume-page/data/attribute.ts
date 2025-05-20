import {
  Apps,
  Badge,
  Dns,
  FullStackedBarChart,
  More,
  School,
  SocialLeaderboard,
  ToolsLadder,
  Work,
} from '@/data/material-symbols'
import { EMPLOYEE_TAG, FREELANCE_TAG } from './adapt-json-resume-work'
import {
  STACK_BACKEND_TAG,
  STACK_FRONTEND_TAG,
  STACK_FULLSTACK_TAG,
} from './adapt-json-resume-project'

export interface Attribute {
  readonly text: string
  readonly symbol: string
}

/** @visibleForTesting */
export const FREELANCE_ATTRIBUTE = {
  text: 'Freelance',
  symbol: Work,
}
/** @visibleForTesting */
export const EMPLOYEE_ATTRIBUTE = {
  text: 'Employee',
  symbol: Badge,
}
/** @visibleForTesting */
export const CUM_LAUDE_ATTRIBUTE = {
  text: 'Cum laude',
  symbol: SocialLeaderboard,
}
/** @visibleForTesting */
export const FULLSTACK_ATTRIBUTE = {
  text: 'Full stack',
  symbol: FullStackedBarChart,
}
export const TAG_TO_ATTRIBUTE: Record<string, Attribute> = {
  [FREELANCE_TAG]: FREELANCE_ATTRIBUTE,
  [EMPLOYEE_TAG]: EMPLOYEE_ATTRIBUTE,
  internship: {
    text: 'Internship',
    symbol: School,
  },
  'more-positions': {
    text: 'More positions during this period\nSee summary for details',
    symbol: More,
  },
  promotions: {
    text: 'Promotions during this period\nSee highlights for details',
    symbol: ToolsLadder,
  },
  'cum-laude': CUM_LAUDE_ATTRIBUTE,
  [STACK_FRONTEND_TAG]: {
    text: 'Frontend',
    symbol: Apps,
  },
  [STACK_BACKEND_TAG]: {
    text: 'Backend',
    symbol: Dns,
  },
  [STACK_FULLSTACK_TAG]: FULLSTACK_ATTRIBUTE,
}
