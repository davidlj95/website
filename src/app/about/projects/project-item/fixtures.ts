import { ProjectItem } from './project-item'
import { DateRange } from '../../date-range/date-range'

export const SAMPLE_NEW_PROJECT_ITEM_ARG: ConstructorParameters<
  typeof ProjectItem
>[0] = {
  name: 'Sample project item',
  description: 'Project item',
  dateRange: new DateRange(new Date('2022-01-01'), new Date('2022-12-31')),
}
export const SAMPLE_PROJECT_ITEM: ProjectItem = new ProjectItem(
  SAMPLE_NEW_PROJECT_ITEM_ARG,
)
