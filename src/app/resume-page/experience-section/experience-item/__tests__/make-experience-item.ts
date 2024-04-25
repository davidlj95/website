import { ExperienceItem } from '../experience-item'
import { Organization } from '../../../organization'
import { DateRange } from '../../../date-range/date-range'
import { makeItemFactory } from '@/test/helpers/make-item-factory'

export const makeExperienceItem = makeItemFactory(ExperienceItem, {
  company: new Organization({
    name: 'Dummy company',
    imageSrc: 'https://fakeCompany.example.com/logo.jpg',
  }),
  summary: 'Dummy summary',
  position: 'Dummy position',
  dateRange: new DateRange(new Date('2023-01-01'), new Date('2023-10-10')),
})
