import { DateRange } from '../../date-range/date-range'

export class ProjectItem {
  public readonly name: string
  public readonly description: string
  public readonly dateRange: DateRange
  public readonly website?: URL
  public readonly roles: ReadonlyArray<string>
  public readonly imageSrc?: string
  public readonly stack?: Stack

  constructor({
    name,
    description,
    dateRange,
    website,
    roles,
    imageSrc,
    stack,
  }: {
    name: string
    description: string
    dateRange: DateRange
    website?: URL
    roles?: ReadonlyArray<string>
    imageSrc?: string
    stack?: Stack
  }) {
    this.name = name
    this.description = description
    this.dateRange = dateRange
    this.website = website
    this.roles = roles ?? []
    this.imageSrc = imageSrc
    this.stack = stack
  }
}

export enum Stack {
  Back = 'back',
  Front = 'front',
  Full = 'full',
}
