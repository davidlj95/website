import { Project } from '../../data/project'
import { DateRange } from '../../data/date-range'
import { makeItemFactory } from '@/test/helpers/make-item-factory'

export const makeProjectItem = makeItemFactory<
  Project,
  ConstructorParameters<typeof Project>[0]
>(Project, {
  name: 'Sample project item',
  entity: 'Project entity',
  description: 'Project item',
  dateRange: new DateRange(new Date('2022-01-01'), new Date('2022-12-31')),
})
