import { DateRange } from '../../date-range/date-range'

export class ProjectItem {
  readonly name: string
  readonly description: string
  readonly dateRange: DateRange
  readonly website?: URL
  readonly roles: readonly string[]
  readonly entity?: string
  readonly imageSrc?: string
  readonly stack?: Stack
  readonly technologies: readonly string[]

  constructor({
    name,
    description,
    dateRange,
    website,
    roles,
    entity,
    imageSrc,
    stack,
    technologies,
  }: {
    name: string
    description: string
    dateRange: DateRange
    website?: URL
    roles?: readonly string[]
    entity: string
    imageSrc?: string
    stack?: Stack
    technologies?: readonly string[]
  }) {
    this.name = name
    this.description = description
    this.dateRange = dateRange
    this.website = website
    this.roles = roles ?? []
    this.entity = entity
    this.imageSrc = imageSrc
    this.stack = stack
    this.technologies = technologies ?? []
  }
}

export enum Stack {
  Back = 'back',
  Front = 'front',
  Full = 'full',
}
