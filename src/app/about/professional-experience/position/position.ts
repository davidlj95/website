export class Position {
  public readonly company: Company
  public readonly role: string
  public readonly startDate: Date
  public readonly endDate?: Date
  public readonly freelance: boolean
  public readonly internship: boolean
  public readonly previousRoles: ReadonlyArray<string>
  public readonly otherRoles: ReadonlyArray<string>
  public readonly summary: string
  public readonly highlights: ReadonlyArray<string>

  constructor({
    company,
    role,
    startDate,
    endDate,
    freelance,
    internship,
    previousRoles,
    otherRoles,
    summary,
    highlights,
  }: {
    company: Company
    role: string
    startDate: Date
    endDate?: Date
    freelance?: boolean
    internship?: boolean
    previousRoles?: ReadonlyArray<string>
    otherRoles?: ReadonlyArray<string>
    summary: string
    highlights?: ReadonlyArray<string>
  }) {
    this.company = company
    this.role = role
    this.startDate = startDate
    this.endDate = endDate
    this.freelance = freelance ?? false
    this.internship = internship ?? false
    this.previousRoles = previousRoles ?? []
    this.otherRoles = otherRoles ?? []
    this.summary = summary
    this.highlights = highlights ?? []
  }
}

export class Company {
  public readonly name: string
  public readonly website: URL
  public readonly image: URL
  public readonly formerlyKnownAs?: string

  constructor({
    name,
    website,
    image,
    formerlyKnownAs,
  }: {
    name: string
    website: URL
    image: URL
    formerlyKnownAs?: string
  }) {
    this.name = name
    this.website = website
    this.image = image
    this.formerlyKnownAs = formerlyKnownAs
  }
}
