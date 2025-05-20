import { inject, InjectionToken } from '@angular/core'
import { DateRange } from '../date-range'
import { RELATIVIZE_PRODUCTION_URL } from '@/common/relativize-production-url'
import { JsonResumeWorkItem } from '../json-resume/types'
import { Experience } from './experience'
import { tagsToAttributes } from '../attribute'

/** @visibleForTesting */
export type AdaptJsonResumeWork = (work: JsonResumeWorkItem) => Experience
export const ADAPT_JSON_RESUME_WORK = new InjectionToken<AdaptJsonResumeWork>(
  /* istanbul ignore next */
  isDevMode ? 'AdaptJsonResumeWork' : 'AJRW',
  {
    factory: () => {
      const relativizeUrl = inject(RELATIVIZE_PRODUCTION_URL)
      // 👇 JSON Resume Schema of "work"
      // https://github.com/jsonresume/resume-schema/blob/v1.0.0/schema.json#L100-L149
      // Includes additional fields though
      return ({
        name,
        image,
        url,
        position,
        summary,
        highlights,
        tags,
        startDate,
        endDate,
      }): Experience => ({
        company: {
          name,
          imageSrc: relativizeUrl(new URL(image)),
          website: url ? new URL(url) : undefined,
        },
        position,
        summary,
        highlights: highlights ?? [],
        attributes: tagsToAttributes(tags ?? []),
        dateRange: new DateRange(
          new Date(startDate),
          !endDate ? undefined : new Date(endDate),
        ),
      })
    },
  },
)
