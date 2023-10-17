export class Organization {
  public readonly name: string
  public readonly website?: URL
  public readonly imageSrc: string
  public readonly shortName?: string

  constructor({
    name,
    website,
    imageSrc,
    shortName,
  }: {
    name: string
    website?: URL
    imageSrc: string
    shortName?: string
  }) {
    this.name = name
    this.website = website
    this.imageSrc = imageSrc
    this.shortName = shortName
  }
}
