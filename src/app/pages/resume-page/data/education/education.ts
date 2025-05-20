import { Organization } from '../organization'
import { DateRange } from '../date-range'
import { Attribute } from '../attribute'

export interface Education {
  readonly institution: Organization
  readonly area: string
  readonly studyType: string
  readonly dateRange: DateRange
  readonly score: string
  readonly courses: readonly string[]
  readonly attributes: readonly Attribute[]
}
