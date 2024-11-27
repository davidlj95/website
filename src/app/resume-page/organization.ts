export class Organization {
  readonly name: string
  readonly website?: URL
  readonly imageSrc: string
  readonly shortName?: string

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
