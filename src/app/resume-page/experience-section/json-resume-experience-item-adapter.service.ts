import { Inject, Injectable } from '@angular/core'
import resume from '../../../../assets/resume.json'
import { ExperienceItem } from './experience-item/experience-item'
import { ENVIRONMENT } from '@common/injection-tokens'
import { Environment } from '../../../environments'
import { Organization } from '../organization'
import { DateRange } from '../date-range/date-range'
import { LocalImageService } from '../local-image.service'

@Injectable({
  providedIn: 'root',
})
export class JsonResumeExperienceItemAdapterService {
  public readonly ASSETS_SUBDIRECTORY = 'companies'

  constructor(
    @Inject(ENVIRONMENT) private environment: Environment,
    private localImageService: LocalImageService,
  ) {}

  // 👇 JSON Resume Schema of "work"
  // https://github.com/jsonresume/resume-schema/blob/v1.0.0/schema.json#L100-L149
  // Includes additional fields though
  adapt(item: JsonResumeWorkItem): ExperienceItem {
    return new ExperienceItem({
      company: new Organization({
        name: item.name,
        imageSrc: this.environment.mapJsonResumeImages
          ? this.localImageService.generatePath({
              name: item.name,
              subdirectory: this.ASSETS_SUBDIRECTORY,
            })
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
}

export type JsonResumeWorkItem = (typeof resume.work)[number]
