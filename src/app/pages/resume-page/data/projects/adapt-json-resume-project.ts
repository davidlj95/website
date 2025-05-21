import { inject, InjectionToken } from '@angular/core'
import { Project } from './project'
import { DateRange } from '../date-range'
import { RELATIVIZE_PRODUCTION_URL } from '@/common/relativize-production-url'
import { JsonResumeProject } from '../json-resume/types'
import { tagsToAttributes } from '../attribute'

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
          attributes: tagsToAttributes(tags ?? []),
          technologies: technologies,
        })
      },
    },
  )
