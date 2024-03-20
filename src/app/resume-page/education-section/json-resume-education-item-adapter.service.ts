import { Inject, Injectable } from '@angular/core'
import resume from '../../../../assets/resume.json'
import { ENVIRONMENT } from '@common/injection-tokens'
import { Environment } from '../../../environments'
import { EducationItem } from './education-item/education-item'
import { Organization } from '../organization'
import { DateRange } from '../date-range/date-range'
import { LocalImageService } from '../local-image.service'

@Injectable({
  providedIn: 'root',
})
export class JsonResumeEducationItemAdapterService {
  public readonly ASSETS_SUBDIRECTORY = 'education'

  constructor(
    @Inject(ENVIRONMENT) private environment: Environment,
    private localImageService: LocalImageService,
  ) {}

  // 👇 JSON Schema of "education"
  // https://github.com/jsonresume/resume-schema/blob/v1.0.0/schema.json#L192-L237
  adapt(item: JsonResumeEducationItem): EducationItem {
    return new EducationItem({
      institution: new Organization({
        name: item.institution,
        website: new URL(item.url),
        imageSrc: this.environment.mapJsonResumeImages
          ? this.localImageService.generatePath({
              name: item.shortName ?? item.institution,
              subdirectory: this.ASSETS_SUBDIRECTORY,
            })
          : item.image,
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
