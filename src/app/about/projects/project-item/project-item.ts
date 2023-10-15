import { DateRange } from '../../date-range/date-range'

export class ProjectItem {
  public readonly name: string
  public readonly description: string
  public readonly dateRange: DateRange
  public readonly website?: URL
  public readonly roles: ReadonlyArray<string>
  public readonly image?: URL

  constructor({
    name,
    description,
    dateRange,
    website,
    roles,
    image,
  }: {
    name: string
    description: string
    dateRange: DateRange
    website?: URL
    roles?: ReadonlyArray<string>
    image?: URL
  }) {
    this.name = name
    this.description = description
    this.dateRange = dateRange
    this.website = website
    this.roles = roles ?? []
    this.image = image
  }
}
