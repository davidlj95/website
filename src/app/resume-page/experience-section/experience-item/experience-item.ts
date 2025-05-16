import { Organization } from '../../organization'
import { DateRange } from '../../date-range/date-range'
import { ProjectItem } from '../../projects-section/project-item/project-item'

export class ExperienceItem {
  readonly company: Organization
  readonly position: string
  readonly dateRange: DateRange
  readonly summary: string
  readonly highlights: readonly string[]
  readonly tags: readonly string[]
  readonly projects: readonly ProjectItem[]

  constructor({
    company,
    position,
    dateRange,
    summary,
    highlights,
    tags,
    projects,
  }: {
    company: Organization
    position: string
    dateRange: DateRange
    summary: string
    highlights?: readonly string[]
    tags?: readonly string[]
    projects?: readonly ProjectItem[]
  }) {
    this.company = company
    this.position = position
    this.dateRange = dateRange
    this.summary = summary
    this.highlights = highlights ?? []
    this.tags = tags ?? []
    this.projects = projects ?? []
  }
}
