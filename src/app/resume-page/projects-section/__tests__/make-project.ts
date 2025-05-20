import { Project } from '../../data/project'
import { DateRange } from '../../data/date-range'

export const makeProject = (overrides: Partial<Project> = {}): Project => ({
  name: 'Sample project item',
  entity: 'Project entity',
  description: 'Project item',
  dateRange: new DateRange(new Date('2022-01-01'), new Date('2022-12-31')),
  roles: [],
  technologies: [],
  ...overrides,
})
