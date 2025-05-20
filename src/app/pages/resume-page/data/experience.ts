import { Organization } from './organization'
import { DateRange } from './date-range'
import { Attribute } from './attribute'

export interface Experience {
  readonly company: Organization
  readonly position: string
  readonly dateRange: DateRange
  readonly summary: string
  readonly highlights: readonly string[]
  readonly attributes: readonly Attribute[]
}
