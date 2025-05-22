import { inject, InjectionToken } from '@angular/core'
import { Education } from './education'
import { DateRange } from '../date-range'
import { RELATIVIZE_PRODUCTION_URL } from '@/common/relativize-production-url'
import { tagsToAttributes } from '../attribute'
import { map, Observable } from 'rxjs'
import { JsonResumeService } from '../json-resume/json-resume.service'

/** @visibleForTesting */
export type GetJsonResumeEducations = () => Observable<readonly Education[]>
/** @visibleForTesting */
export const GET_JSON_RESUME_EDUCATIONS =
  new InjectionToken<GetJsonResumeEducations>(
    /* istanbul ignore next */
    isDevMode ? 'GetJsonResumeEducations' : 'GJRE',
    {
      factory: () => {
        const jsonResumeService = inject(JsonResumeService)
        const relativizeUrl = inject(RELATIVIZE_PRODUCTION_URL)
        // 👇 JSON Schema of "education"
        // https://github.com/jsonresume/resume-schema/blob/v1.0.0/schema.json#L192-L237
        return () =>
          jsonResumeService.getEducation().pipe(
            map((education) =>
              education.map(
                ({
                  institution,
                  url,
                  image,
                  shortName,
                  area,
                  studyType,
                  startDate,
                  endDate,
                  score,
                  courses,
                  tags,
                }) => ({
                  institution: {
                    name: institution,
                    website: new URL(url),
                    imageSrc: relativizeUrl(new URL(image)),
                    shortName,
                  },
                  area,
                  studyType,
                  dateRange: new DateRange(
                    new Date(startDate),
                    !endDate ? undefined : new Date(endDate),
                  ),
                  score,
                  courses,
                  attributes: tagsToAttributes(tags ?? []),
                }),
              ),
            ),
          )
      },
    },
  )
