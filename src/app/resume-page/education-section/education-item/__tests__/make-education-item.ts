import { DateRange } from '../../../data/date-range'
import { Education } from '../../../data/education'
import { makeItemFactory } from '@/test/helpers/make-item-factory'

export const makeEducationItem = makeItemFactory<
  Education,
  ConstructorParameters<typeof Education>[0]
>(Education, {
  institution: {
    name: 'Institution name',
    imageSrc: 'https://example.org/logo.png',
    website: new URL('https://example.org'),
  },
  area: 'Area',
  studyType: 'Study type',
  score: 'Score',
  dateRange: new DateRange(new Date('2023-01-01'), new Date('2023-12-31')),
})
