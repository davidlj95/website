import { DateRange } from '../../date-range/date-range'
import { SimpleIcon } from 'simple-icons'

export class ProjectItem {
  public readonly name: string
  public readonly description: string
  public readonly dateRange: DateRange
  public readonly website?: URL
  public readonly roles: ReadonlyArray<string>
  public readonly imageSrc?: string
  public readonly stack?: Stack
  public readonly technologies: ReadonlyArray<Technology>

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
    roles?: ReadonlyArray<string>
    imageSrc?: string
    stack?: Stack
    technologies?: ReadonlyArray<Technology>
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

export interface Technology {
  readonly id: string
  readonly version?: string
  readonly simpleIcon?: SimpleIcon
}
