import { DateRange } from '../date-range'
import { Education } from '../education'

export const makeEducation = (
  overrides: Partial<Education> = {},
): Education => ({
  institution: {
    name: 'Institution name',
    imageSrc: 'https://example.org/logo.png',
    website: new URL('https://example.org'),
  },
  area: 'Area',
  studyType: 'Study type',
  score: 'Score',
  courses: [],
  tags: [],
  dateRange: new DateRange(new Date('2023-01-01'), new Date('2023-12-31')),
  ...overrides,
})
