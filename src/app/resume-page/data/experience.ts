import { Organization } from './organization'
import { DateRange } from './date-range'
import { Project } from './project'

export interface Experience {
  readonly company: Organization
  readonly position: string
  readonly dateRange: DateRange
  readonly summary: string
  readonly highlights: readonly string[]
  readonly tags: readonly string[]
  readonly projects: readonly Project[]
}
