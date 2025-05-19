import { DateRange } from '../date-range'
import { Experience } from '../experience-service'

export const makeExperience = (
  overrides: Partial<Experience> = {},
): Experience => ({
  company: {
    name: 'Dummy company',
    imageSrc: 'https://fakeCompany.example.com/logo.jpg',
  },
  highlights: [],
  tags: [],
  projects: [],
  summary: 'Dummy summary',
  position: 'Dummy position',
  dateRange: new DateRange(new Date('2023-01-01'), new Date('2023-10-10')),
  ...overrides,
})
