import { ProjectItem } from '../project-item'
import { DateRange } from '../../../date-range/date-range'
import { makeItemFactory } from '@/test/helpers/make-item-factory'

export const makeProjectItem = makeItemFactory(ProjectItem, {
  name: 'Sample project item',
  description: 'Project item',
  dateRange: new DateRange(new Date('2022-01-01'), new Date('2022-12-31')),
})
