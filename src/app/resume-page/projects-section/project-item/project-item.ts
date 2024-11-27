import { DateRange } from '../../date-range/date-range'
import { TechnologyItem } from '../../technology/technology-item'

export class ProjectItem {
  readonly name: string
  readonly description: string
  readonly dateRange: DateRange
  readonly website?: URL
  readonly roles: readonly string[]
  readonly imageSrc?: string
  readonly stack?: Stack
  readonly technologies: readonly TechnologyItem[]

  constructor({
    name,
    description,
    dateRange,
    website,
    roles,
    imageSrc,
    stack,
    technologies,
  }: {
    name: string
    description: string
    dateRange: DateRange
    website?: URL
    roles?: readonly string[]
    imageSrc?: string
    stack?: Stack
    technologies?: readonly TechnologyItem[]
  }) {
    this.name = name
    this.description = description
    this.dateRange = dateRange
    this.website = website
    this.roles = roles ?? []
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
