import { Inject, Injectable } from '@angular/core'
import resume from '../../../../assets/resume.json'
import { ENVIRONMENT } from '../../common/injection-tokens'
import { Environment } from '../../../environments'
import { SlugGeneratorService } from '../../common/slug-generator.service'
import { EducationItem } from './education-item/education-item'
import { Organization } from '../organization'
import { DateRange } from '../date-range/date-range'

@Injectable({
  providedIn: 'root',
})
export class JsonResumeEducationItemAdapterService {
  public readonly EDUCATION_IMAGES_PATH = 'assets/education/'
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

  // 👇 JSON Schema of "education"
  // https://github.com/jsonresume/resume-schema/blob/v1.0.0/schema.json#L192-L237
  adapt(item: JsonResumeEducationItem): EducationItem {
    return new EducationItem({
      institution: new Organization({
        name: item.institution,
        website: new URL(item.url),
        imageSrc: this.mapJsonResumeImages
          ? this.imagePathFromInstitutionName(
              item.shortName ?? item.institution,
            )
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

  private imagePathFromInstitutionName(institutionName: string): string {
    return new URL(
      this.EDUCATION_IMAGES_PATH +
        this.slugGenerator.generate(institutionName) +
        this.IMAGE_EXTENSION,
      this.canonicalURL,
    ).toString()
  }
}

export type JsonResumeEducationItem = (typeof resume.education)[number]
