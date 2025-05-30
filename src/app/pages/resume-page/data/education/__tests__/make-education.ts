import { dateRangeFromStrings } from '../../date-range'
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
  attributes: [],
  dateRange: dateRangeFromStrings('2023-01-01', '2023-12-31'),
  ...overrides,
})
