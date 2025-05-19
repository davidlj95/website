import { Badge, More, School, ToolsLadder, Work } from '@/data/material-symbols'
import { EMPLOYEE_TAG, FREELANCE_TAG } from '../../data/adapt-json-resume-work'

export const TAG_TO_ATTRIBUTE: Record<string, Attribute> = {
  [FREELANCE_TAG]: {
    text: 'Freelance',
    symbol: Work,
  },
  [EMPLOYEE_TAG]: {
    text: 'Employee',
    symbol: Badge,
  },
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
}

interface Attribute {
  text: string
  symbol: string
}
