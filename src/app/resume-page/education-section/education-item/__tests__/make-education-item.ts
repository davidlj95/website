import { Organization } from '../../../organization'
import { DateRange } from '../../../date-range/date-range'
import { EducationItem } from '../education-item'
import { makeItemFactory } from '@/test/helpers/make-item-factory'

export const makeEducationItem = makeItemFactory<
  EducationItem,
  ConstructorParameters<typeof EducationItem>[0]
>(EducationItem, {
  institution: new Organization({
    name: 'Institution name',
    imageSrc: 'https://example.org/logo.png',
    website: new URL('https://example.org'),
  }),
  area: 'Area',
  studyType: 'Study type',
  score: 'Score',
  dateRange: new DateRange(new Date('2023-01-01'), new Date('2023-12-31')),
})
