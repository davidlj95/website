import { Inject, Injectable } from '@angular/core'
import resume from '../../../../assets/resume.json'
import { ExperienceItem } from './experience-item/experience-item'
import { Organization } from '../organization'
import { DateRange } from '../date-range/date-range'
import {
  RELATIVIZE_PRODUCTION_URL,
  RelativizeProductionUrl,
} from '@/common/relativize-production-url'

@Injectable({
  providedIn: 'root',
})
export class JsonResumeExperienceItemAdapterService {
  constructor(
    @Inject(RELATIVIZE_PRODUCTION_URL)
    private readonly relativizeUrl: RelativizeProductionUrl,
  ) {}

  // 👇 JSON Resume Schema of "work"
  // https://github.com/jsonresume/resume-schema/blob/v1.0.0/schema.json#L100-L149
  // Includes additional fields though
  adapt(item: JsonResumeWorkItem): ExperienceItem {
    return new ExperienceItem({
      company: new Organization({
        name: item.name,
        imageSrc: this.relativizeUrl(new URL(item.image)),
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
