import { DateRange } from '../date-range'
import { Attribute } from '../attribute'

export interface Project {
  readonly name: string
  readonly description: string
  readonly dateRange: DateRange
  readonly website?: URL
  readonly roles: readonly string[]
  readonly entity?: string
  readonly imageSrc?: string
  readonly attributes: readonly Attribute[]
  readonly technologies: readonly string[]
}
