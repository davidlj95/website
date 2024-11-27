import { Organization } from '../../organization'
import { DateRange } from '../../date-range/date-range'
import { ProjectItem } from '../../projects-section/project-item/project-item'

export class ExperienceItem {
  readonly company: Organization
  readonly position: string
  readonly dateRange: DateRange
  readonly summary: string
  readonly highlights: readonly string[]
  readonly isFreelance: boolean
  readonly isInternship: boolean
  readonly hasPromotions: boolean
  readonly hasMorePositions: boolean
  readonly projects: readonly ProjectItem[]

  constructor({
    company,
    position,
    dateRange,
    summary,
    highlights,
    isFreelance,
    isInternship,
    hasPromotions,
    hasMorePositions,
    projects,
  }: {
    company: Organization
    position: string
    dateRange: DateRange
    summary: string
    highlights?: readonly string[]
    isFreelance?: boolean
    isInternship?: boolean
    hasPromotions?: boolean
    hasMorePositions?: boolean
    projects?: readonly ProjectItem[]
  }) {
    this.company = company
    this.position = position
    this.dateRange = dateRange
    this.summary = summary
    this.highlights = highlights ?? []
    this.isFreelance = isFreelance ?? false
    this.isInternship = isInternship ?? false
    this.hasPromotions = hasPromotions ?? false
    this.hasMorePositions = hasMorePositions ?? false
    this.projects = projects ?? []
  }
}
