import { DateRange } from '../../date-range/date-range'

export class ProjectItem {
  public readonly name: string
  public readonly description: string
  public readonly dateRange: DateRange
  public readonly website?: URL
  public readonly roles: ReadonlyArray<string>

  constructor({
    name,
    description,
    dateRange,
    website,
    roles,
  }: {
    name: string
    description: string
    dateRange: DateRange
    website?: URL
    roles?: ReadonlyArray<string>
  }) {
    this.name = name
    this.description = description
    this.dateRange = dateRange
    this.website = website
    this.roles = roles ?? []
  }
}
