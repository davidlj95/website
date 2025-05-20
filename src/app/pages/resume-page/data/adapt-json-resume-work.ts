import { inject, InjectionToken } from '@angular/core'
import { DateRange } from './date-range'
import { RELATIVIZE_PRODUCTION_URL } from '@/common/relativize-production-url'
import { JsonResumeWorkItem } from '../json-resume/types'
import { Experience } from './experience'
import { Attribute, TAG_TO_ATTRIBUTE } from './attribute'
import { isNotUndefined } from '@/common/is-not-undefined'

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
        position: position,
        summary: summary,
        highlights: highlights ?? [],
        attributes: tagsToAttributes(tags),
        dateRange: new DateRange(
          new Date(startDate),
          !endDate ? undefined : new Date(endDate),
        ),
      })
    },
  },
)

const tagsToAttributes = (
  jsonTags: readonly string[] | undefined,
): readonly Attribute[] => {
  const tags = jsonTags ?? []
  const autoTags =
    !tags.includes(FREELANCE_TAG) && !tags.includes(EMPLOYEE_TAG)
      ? [...tags, EMPLOYEE_TAG]
      : tags
  return autoTags.map((tag) => TAG_TO_ATTRIBUTE[tag]).filter(isNotUndefined)
}

export const FREELANCE_TAG = 'freelance'
export const EMPLOYEE_TAG = 'employee'
