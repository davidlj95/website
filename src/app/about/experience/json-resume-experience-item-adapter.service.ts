import { Inject, Injectable } from '@angular/core'
import resume from '../../../../assets/resume.json'
import { ExperienceItem } from './experience-item/experience-item'
import { ENVIRONMENT } from '../../common/injection-tokens'
import { Environment } from '../../../environments'
import { SlugGeneratorService } from '../../common/slug-generator.service'
import { Organization } from '../organization'
import { DateRange } from '../date-range/date-range'

@Injectable({
  providedIn: 'root',
})
export class JsonResumeExperienceItemAdapterService {
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
  adapt(item: JsonResumeWorkItem): ExperienceItem {
    return new ExperienceItem({
      company: new Organization({
        name: item.name,
        // Point to assets in this repo using canonical URL from env, so we can change the image and preview it.
        // Links in resume.json work anyway
        imageSrc: this.mapJsonResumeImages
          ? this.imageSrcFromCompanyName(item.name)
          : item.image,
        website: new URL(item.url),
      }),
      position: item.position,
      summary: item.summary,
      highlights: item.highlights,
      dateRange: new DateRange(
        new Date(item.startDate),
        !item.endDate ? undefined : new Date(item.endDate),
      ),
      freelance: item.freelance,
      internship: item.internship,
      promotions: item.promotions,
      morePositions: item.morePositions,
    })
  }

  private imageSrcFromCompanyName(companyName: string): string {
    return new URL(
      this.COMPANIES_IMAGE_ASSETS_PATH +
        this.slugGenerator.generate(companyName) +
        this.IMAGE_EXTENSION,
      this.canonicalURL,
    ).toString()
  }
}

export type JsonResumeWorkItem = (typeof resume.work)[number]
