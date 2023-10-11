import { Organization } from '../../organization'

export class Position {
  public readonly company: Organization
  public readonly role: string
  public readonly startDate: Date
  public readonly endDate?: Date
  public readonly freelance: boolean
  public readonly internship: boolean
  public readonly promotions: boolean
  public readonly otherRoles: boolean
  public readonly summary: string
  public readonly highlights: ReadonlyArray<string>

  constructor({
    company,
    role,
    startDate,
    endDate,
    freelance,
    internship,
    promotions,
    otherRoles,
    summary,
    highlights,
  }: {
    company: Organization
    role: string
    startDate: Date
    endDate?: Date
    freelance?: boolean
    internship?: boolean
    promotions?: boolean
    otherRoles?: boolean
    summary: string
    highlights?: ReadonlyArray<string>
  }) {
    this.company = company
    this.role = role
    this.startDate = startDate
    this.endDate = endDate
    this.freelance = freelance ?? false
    this.internship = internship ?? false
    this.promotions = promotions ?? false
    this.otherRoles = otherRoles ?? false
    this.summary = summary
    this.highlights = highlights ?? []
  }
}
