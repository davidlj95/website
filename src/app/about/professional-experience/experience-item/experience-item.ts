import { Organization } from '../../organization'
import { DateRange } from '../../date-range/date-range'

export class ExperienceItem {
  public readonly company: Organization
  public readonly role: string
  public readonly dateRange: DateRange
  public readonly freelance: boolean
  public readonly internship: boolean
  public readonly promotions: boolean
  public readonly otherRoles: boolean
  public readonly summary: string
  public readonly highlights: ReadonlyArray<string>

  constructor({
    company,
    role,
    dateRange,
    freelance,
    internship,
    promotions,
    otherRoles,
    summary,
    highlights,
  }: {
    company: Organization
    role: string
    dateRange: DateRange
    freelance?: boolean
    internship?: boolean
    promotions?: boolean
    otherRoles?: boolean
    summary: string
    highlights?: ReadonlyArray<string>
  }) {
    this.company = company
    this.role = role
    this.dateRange = dateRange
    this.freelance = freelance ?? false
    this.internship = internship ?? false
    this.promotions = promotions ?? false
    this.otherRoles = otherRoles ?? false
    this.summary = summary
    this.highlights = highlights ?? []
  }
}
