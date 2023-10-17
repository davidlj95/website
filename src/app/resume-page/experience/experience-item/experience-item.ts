import { Organization } from '../../organization'
import { DateRange } from '../../date-range/date-range'

export class ExperienceItem {
  public readonly company: Organization
  public readonly position: string
  public readonly dateRange: DateRange
  public readonly summary: string
  public readonly highlights: ReadonlyArray<string>
  public readonly freelance: boolean
  public readonly internship: boolean
  public readonly promotions: boolean
  public readonly morePositions: boolean

  constructor({
    company,
    position,
    dateRange,
    summary,
    highlights,
    freelance,
    internship,
    promotions,
    morePositions,
  }: {
    company: Organization
    position: string
    dateRange: DateRange
    summary: string
    highlights?: ReadonlyArray<string>
    freelance?: boolean
    internship?: boolean
    promotions?: boolean
    morePositions?: boolean
  }) {
    this.company = company
    this.position = position
    this.dateRange = dateRange
    this.summary = summary
    this.highlights = highlights ?? []
    this.freelance = freelance ?? false
    this.internship = internship ?? false
    this.promotions = promotions ?? false
    this.morePositions = morePositions ?? false
  }
}
