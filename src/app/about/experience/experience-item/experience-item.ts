import { Organization } from '../../organization'
import { DateRange } from '../../date-range/date-range'

export class ExperienceItem {
  public readonly company: Organization
  public readonly position: string
  public readonly dateRange: DateRange
  public readonly freelance: boolean
  public readonly internship: boolean
  public readonly promotions: boolean
  public readonly morePositions: boolean
  public readonly summary: string
  public readonly highlights: ReadonlyArray<string>

  constructor({
    company,
    position,
    dateRange,
    freelance,
    internship,
    promotions,
    morePositions,
    summary,
    highlights,
  }: {
    company: Organization
    position: string
    dateRange: DateRange
    freelance?: boolean
    internship?: boolean
    promotions?: boolean
    morePositions?: boolean
    summary: string
    highlights?: ReadonlyArray<string>
  }) {
    this.company = company
    this.position = position
    this.dateRange = dateRange
    this.freelance = freelance ?? false
    this.internship = internship ?? false
    this.promotions = promotions ?? false
    this.morePositions = morePositions ?? false
    this.summary = summary
    this.highlights = highlights ?? []
  }
}
