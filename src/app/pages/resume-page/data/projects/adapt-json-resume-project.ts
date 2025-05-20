import { inject, InjectionToken } from '@angular/core'
import { Project } from './project'
import { DateRange } from '../date-range'
import { RELATIVIZE_PRODUCTION_URL } from '@/common/relativize-production-url'
import { JsonResumeProject } from '../json-resume/types'
import { TAG_TO_ATTRIBUTE } from '../attribute'
import { isNotUndefined } from '@/common/is-not-undefined'

/** @visibleForTesting */
export type AdaptJsonResumeProject = (project: JsonResumeProject) => Project
export const ADAPT_JSON_RESUME_PROJECT =
  new InjectionToken<AdaptJsonResumeProject>(
    /* istanbul ignore next */
    isDevMode ? 'AdaptJsonResumeProject' : 'AJRP',
    {
      factory: () => {
        const relativizeUrl = inject(RELATIVIZE_PRODUCTION_URL)
        return ({
          name,
          description,
          startDate,
          endDate,
          url,
          roles,
          entity,
          image,
          tags,
          technologies,
        }) => ({
          name,
          description,
          dateRange: new DateRange(
            new Date(startDate),
            endDate ? new Date(endDate) : undefined,
          ),
          website: url ? new URL(url) : undefined,
          roles,
          entity,
          imageSrc: image ? relativizeUrl(new URL(image)) : undefined,
          attributes: (tags ?? [])
            .map((tag) => TAG_TO_ATTRIBUTE[tag])
            .filter(isNotUndefined),
          technologies: technologies,
        })
      },
    },
  )

export const STACK_FRONTEND_TAG = 'stack-front'
export const STACK_BACKEND_TAG = 'stack-back'
export const STACK_FULLSTACK_TAG = 'stack-full'
