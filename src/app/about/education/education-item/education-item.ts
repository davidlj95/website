import { Organization } from '../../organization'
import { DateRange } from '../../date-range/date-range'

export class EducationItem {
  public readonly institution: Organization
  public readonly area: string
  public readonly studyType: string
  public readonly dateRange: DateRange
  public readonly score: string
  public readonly courses: ReadonlyArray<string>
  public readonly cumLaude: boolean

  constructor({
    institution,
    area,
    studyType,
    dateRange,
    score,
    courses,
    cumLaude,
  }: {
    institution: Organization
    area: string
    studyType: string
    dateRange: DateRange
    score: string
    courses?: ReadonlyArray<string>
    cumLaude?: boolean
  }) {
    this.institution = institution
    this.area = area
    this.studyType = studyType
    this.dateRange = dateRange
    this.score = score
    this.courses = courses ?? []
    this.cumLaude = cumLaude ?? false
  }
}
