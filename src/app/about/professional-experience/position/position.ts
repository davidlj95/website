export class Position {
  public readonly imageUrl: URL
  public readonly company: string
  public readonly companyWebsite: URL
  public readonly role: string
  public readonly startDate: Date
  public readonly endDate?: Date
  public readonly freelance: boolean
  public readonly internship: boolean
  public readonly initialPositions: ReadonlyArray<string>
  public readonly otherPositions: ReadonlyArray<string>

  constructor({
    imageUrl,
    company,
    companyWebsite,
    role,
    startDate,
    endDate,
    freelance,
    internship,
    initialPositions,
    otherPositions,
  }: {
    imageUrl: URL
    company: string
    companyWebsite: URL
    role: string
    startDate: Date
    endDate?: Date
    freelance?: boolean
    internship?: boolean
    initialPositions?: ReadonlyArray<string>
    otherPositions?: ReadonlyArray<string>
  }) {
    this.imageUrl = imageUrl
    this.company = company
    this.companyWebsite = companyWebsite
    this.role = role
    this.startDate = startDate
    this.endDate = endDate
    this.freelance = freelance ?? false
    this.internship = internship ?? false
    this.initialPositions = initialPositions ?? []
    this.otherPositions = otherPositions ?? []
  }
}
