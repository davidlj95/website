import { Inject, Injectable } from '@angular/core'
import resume from '../../../../assets/resume.json'
import { EducationItem } from './education-item/education-item'
import { Organization } from '../organization'
import { DateRange } from '../date-range/date-range'
import {
  RELATIVIZE_PRODUCTION_URL,
  RelativizeProductionUrl,
} from '@/common/relativize-production-url'

@Injectable({
  providedIn: 'root',
})
export class JsonResumeEducationItemAdapterService {
  constructor(
    @Inject(RELATIVIZE_PRODUCTION_URL)
    private readonly relativizeUrl: RelativizeProductionUrl,
  ) {}

  // 👇 JSON Schema of "education"
  // https://github.com/jsonresume/resume-schema/blob/v1.0.0/schema.json#L192-L237
  adapt(item: JsonResumeEducationItem): EducationItem {
    return new EducationItem({
      institution: new Organization({
        name: item.institution,
        website: new URL(item.url),
        imageSrc: this.relativizeUrl(new URL(item.image)),
        shortName: item.shortName,
      }),
      area: item.area,
      studyType: item.studyType,
      dateRange: new DateRange(
        new Date(item.startDate),
        !item.endDate ? undefined : new Date(item.endDate),
      ),
      score: item.score,
      courses: item.courses,
      cumLaude: !!item.cumLaude,
    })
  }
}

export type JsonResumeEducationItem = (typeof resume.education)[number]
