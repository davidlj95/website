import { Organization } from '../../organization'
import { DateRange } from '../../date-range/date-range'

export class EducationItem {
  readonly institution: Organization
  readonly area: string
  readonly studyType: string
  readonly dateRange: DateRange
  readonly score: string
  readonly courses: readonly string[]
  readonly isCumLaude: boolean

  constructor({
    institution,
    area,
    studyType,
    dateRange,
    score,
    courses,
    isCumLaude,
  }: {
    institution: Organization
    area: string
    studyType: string
    dateRange: DateRange
    score: string
    courses?: readonly string[]
    isCumLaude?: boolean
  }) {
    this.institution = institution
    this.area = area
    this.studyType = studyType
    this.dateRange = dateRange
    this.score = score
    this.courses = courses ?? []
    this.isCumLaude = isCumLaude ?? false
  }
}
