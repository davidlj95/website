import { Organization } from './organization'
import { DateRange } from './date-range'
import { ProjectItem } from '../projects-section/project-item/project-item'

export interface Experience {
  readonly company: Organization
  readonly position: string
  readonly dateRange: DateRange
  readonly summary: string
  readonly highlights: readonly string[]
  readonly tags: readonly string[]
  readonly projects: readonly ProjectItem[]
}
