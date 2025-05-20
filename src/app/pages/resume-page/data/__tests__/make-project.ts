import { Project } from '../project'
import { DateRange } from '../date-range'

export const makeProject = (overrides: Partial<Project> = {}): Project => ({
  name: 'Sample project',
  entity: 'Project entity',
  description: 'Project',
  dateRange: new DateRange(new Date('2022-01-01'), new Date('2022-12-31')),
  roles: [],
  technologies: [],
  attributes: [],
  ...overrides,
})
