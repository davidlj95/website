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
import { isNotUndefined } from '@/common/is-not-undefined'

export interface Attribute {
  readonly text: string
  readonly symbol: string
}

/** @visibleForTesting */
export const FREELANCE_TAG = 'freelance'
/** @visibleForTesting */
export const FREELANCE_ATTRIBUTE = {
  text: 'Freelance',
  symbol: Work,
}
/** @visibleForTesting */
export const EMPLOYEE_TAG = 'employee'
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
const TAG_TO_ATTRIBUTE: Record<string, Attribute> = {
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
  'stack-front': {
    text: 'Frontend',
    symbol: Apps,
  },
  'stack-back': {
    text: 'Backend',
    symbol: Dns,
  },
  'stack-full': FULLSTACK_ATTRIBUTE,
}

export const tagsToAttributes = (tags: readonly string[]): Attribute[] =>
  tags.map((tag) => TAG_TO_ATTRIBUTE[tag]).filter(isNotUndefined)
