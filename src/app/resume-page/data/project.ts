import { DateRange } from './date-range'

export interface Project {
  readonly name: string
  readonly description: string
  readonly dateRange: DateRange
  readonly website?: URL
  readonly roles: readonly string[]
  readonly entity?: string
  readonly imageSrc?: string
  readonly stack?: Stack
  readonly technologies: readonly string[]
}

export enum Stack {
  Back = 'back',
  Front = 'front',
  Full = 'full',
}
