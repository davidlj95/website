import { inject, InjectionToken } from '@angular/core'
import { Education } from './education'
import { DateRange } from '../date-range'
import { RELATIVIZE_PRODUCTION_URL } from '@/common/relativize-production-url'
import { JsonResumeEducationItem } from '../json-resume/types'
import { tagsToAttributes } from '../attribute'

/** @visibleForTesting */
export type AdaptJsonResumeEducation = (
  educationItem: JsonResumeEducationItem,
) => Education
/** @visibleForTesting */
export const ADAPT_JSON_RESUME_EDUCATION =
  new InjectionToken<AdaptJsonResumeEducation>(
    /* istanbul ignore next */
    isDevMode ? 'AdaptJsonResumeEducation' : 'AJRE',
    {
      factory: () => {
        const relativizeUrl = inject(RELATIVIZE_PRODUCTION_URL)
        // 👇 JSON Schema of "education"
        // https://github.com/jsonresume/resume-schema/blob/v1.0.0/schema.json#L192-L237
        return ({
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
        })
      },
    },
  )
