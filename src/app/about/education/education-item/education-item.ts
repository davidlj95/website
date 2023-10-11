import { Organization } from '../../organization'

export class EducationItem {
  public readonly institution: Organization
  public readonly area: string
  public readonly studyType: string
  public readonly startDate: Date
  public readonly endDate?: Date
  public readonly score: string
  public readonly courses: ReadonlyArray<string>
  public readonly cumLaude: boolean

  constructor({
    institution,
    area,
    studyType,
    startDate,
    endDate,
    score,
    courses,
    cumLaude,
  }: {
    institution: Organization
    area: string
    studyType: string
    startDate: Date
    endDate?: Date
    score: string
    courses?: ReadonlyArray<string>
    cumLaude?: boolean
  }) {
    this.institution = institution
    this.area = area
    this.studyType = studyType
    this.startDate = startDate
    this.endDate = endDate
    this.score = score
    this.courses = courses ?? []
    this.cumLaude = cumLaude ?? false
  }
}
