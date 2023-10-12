export class Organization {
  public readonly name: string
  public readonly website?: URL
  public readonly image: URL

  constructor({
    name,
    website,
    image,
  }: {
    name: string
    website?: URL
    image: URL
  }) {
    this.name = name
    this.website = website
    this.image = image
  }
}
