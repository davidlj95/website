import { dateRangeFromStrings } from '../../date-range'
import { Experience } from '../experience'

export const makeExperience = (
  overrides: Partial<Experience> = {},
): Experience => ({
  company: {
    name: 'Dummy company',
    imageSrc: 'https://fakeCompany.example.com/logo.jpg',
  },
  highlights: [],
  attributes: [],
  summary: 'Dummy summary',
  position: 'Dummy position',
  dateRange: dateRangeFromStrings('2023-01-01', '2023-10-10'),
  relatedProjects: [],
  technologies: [],
  ...overrides,
})
