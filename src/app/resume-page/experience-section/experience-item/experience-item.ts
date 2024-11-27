import { Organization } from '../../organization'
import { DateRange } from '../../date-range/date-range'
import { ProjectItem } from '../../projects-section/project-item/project-item'

export class ExperienceItem {
  readonly company: Organization
  readonly position: string
  readonly dateRange: DateRange
  readonly summary: string
  readonly highlights: readonly string[]
  readonly freelance: boolean
  readonly internship: boolean
  readonly promotions: boolean
  readonly morePositions: boolean
  readonly projects: readonly ProjectItem[]

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
    projects,
  }: {
    company: Organization
    position: string
    dateRange: DateRange
    summary: string
    highlights?: readonly string[]
    freelance?: boolean
    internship?: boolean
    promotions?: boolean
    morePositions?: boolean
    projects?: readonly ProjectItem[]
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
    this.projects = projects ?? []
  }
}
