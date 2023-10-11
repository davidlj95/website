import { Inject, Injectable } from '@angular/core'
import resume from '../../../../assets/resume.json'
import { Position } from './position/position'
import { ENVIRONMENT } from '../../common/injection-tokens'
import { Environment } from '../../../environments'
import { SlugGeneratorService } from '../../common/slug-generator.service'
import { Organization } from '../organization'
import { DateRange } from '../date-range/date-range'

@Injectable({
  providedIn: 'root',
})
export class JsonResumePositionAdapterService {
  public readonly COMPANIES_IMAGE_ASSETS_PATH = 'assets/companies/'
  public readonly IMAGE_EXTENSION = '.png'
  private readonly canonicalURL: URL
  private readonly mapJsonResumeImages: boolean

  constructor(
    @Inject(ENVIRONMENT) environment: Environment,
    private slugGenerator: SlugGeneratorService,
  ) {
    this.canonicalURL = environment.canonicalUrl
    this.mapJsonResumeImages = environment.mapJsonResumeImages
  }

  // 👇 JSON Resume Schema of "work"
  // https://github.com/jsonresume/resume-schema/blob/v1.0.0/schema.json#L100-L149
  // Includes additional fields though
  adapt(position: JsonResumeWorkPosition): Position {
    return new Position({
      company: new Organization({
        name: position.name,
        // Point to assets in this repo using canonical URL from env, so we can change the image and preview it.
        // Links in resume.json work anyway
        image: this.mapJsonResumeImages
          ? this.imageUrlFromCompanyName(position.name)
          : new URL(position.image),
        website: new URL(position.url),
      }),
      role: position.position,
      summary: position.summary,
      highlights: position.highlights,
      dateRange: new DateRange(
        new Date(position.startDate),
        !position.endDate ? undefined : new Date(position.endDate),
      ),
      freelance: position.freelance,
      internship: position.internship,
      promotions: position.promotions,
      otherRoles: position.otherRoles,
    })
  }

  private imageUrlFromCompanyName(companyName: string): URL {
    return new URL(
      this.COMPANIES_IMAGE_ASSETS_PATH +
        this.slugGenerator.generate(companyName) +
        this.IMAGE_EXTENSION,
      this.canonicalURL,
    )
  }
}

export type JsonResumeWorkPosition = (typeof resume.work)[number]
