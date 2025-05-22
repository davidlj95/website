import { Project } from '../project'
import { dateRangeFromStrings } from '../../date-range'

export const makeProject = (overrides: Partial<Project> = {}): Project => ({
  name: 'Sample project',
  entity: 'Project entity',
  description: 'Project',
  dateRange: dateRangeFromStrings('2022-01-01', '2022-12-31'),
  roles: [],
  technologies: [],
  attributes: [],
  ...overrides,
})
