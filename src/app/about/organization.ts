export class Organization {
  public readonly name: string
  public readonly website?: URL
  public readonly image: URL
  public readonly shortName?: string

  constructor({
    name,
    website,
    image,
    shortName,
  }: {
    name: string
    website?: URL
    image: URL
    shortName?: string
  }) {
    this.name = name
    this.website = website
    this.image = image
    this.shortName = shortName
  }
}
