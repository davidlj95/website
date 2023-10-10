import { Inject, Injectable } from '@angular/core'
import resume from '../../../../assets/resume.json'
import { Company, Position } from './position/position'
import { ENVIRONMENT } from '../../common/injection-tokens'
import { Environment } from '../../../environments'

@Injectable({
  providedIn: 'root',
})
export class JsonResumePositionAdapterService {
  public readonly COMPANIES_IMAGE_ASSETS_PATH = 'assets/companies/'
  public readonly IMAGE_EXTENSION = '.png'
  private readonly canonicalURL: URL

  constructor(@Inject(ENVIRONMENT) environment: Environment) {
    this.canonicalURL = environment.canonicalUrl
  }

  adapt(position: JsonResumeWorkPosition): Position {
    return new Position({
      company: new Company({
        name: position.company,
        image: this.imageUrlFromCompanyName(position.company),
        website: new URL(position.website),
        formerlyKnownAs: position.formerlyKnownAs,
      }),
      role: position.position,
      summary: position.summary,
      highlights: position.highlights,
      startDate: new Date(position.startDate),
      endDate: position.endDate ? new Date(position.endDate) : undefined,
      freelance: position.freelance,
      internship: position.internship,
      promotions: position.promotions,
      otherRoles: position.otherRoles,
    })
  }

  private imageUrlFromCompanyName(companyName: string): URL {
    // https://gist.github.com/djabif/b8d21c4ebcef51db7a4a28ecf3d41846
    const kebabCasedCompanyName = companyName
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/--+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '') // Trim - from end of text
    // https://stackoverflow.com/a/37511463/3263250
    const noAccentsDiacriticsCompanyName = kebabCasedCompanyName
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
    return new URL(
      this.COMPANIES_IMAGE_ASSETS_PATH +
        noAccentsDiacriticsCompanyName +
        this.IMAGE_EXTENSION,
      this.canonicalURL,
    )
  }
}

export type JsonResumeWorkPosition = (typeof resume.work)[number]
