import { inject, InjectionToken } from '@angular/core'
import { Project } from './project'
import { DateRange } from '../date-range'
import { RELATIVIZE_PRODUCTION_URL } from '@/common/relativize-production-url'
import { tagsToAttributes } from '../attribute'
import { map, Observable } from 'rxjs'
import { JsonResumeService } from '../json-resume/json-resume.service'

/** @visibleForTesting */
export type GetJsonResumeProjects = () => Observable<readonly Project[]>
export const GET_JSON_RESUME_PROJECTS =
  new InjectionToken<GetJsonResumeProjects>(
    /* istanbul ignore next */
    isDevMode ? 'GetJsonResumeProjects' : 'GJRP',
    {
      factory: () => {
        const jsonResumeService = inject(JsonResumeService)
        const relativizeUrl = inject(RELATIVIZE_PRODUCTION_URL)
        return () =>
          jsonResumeService.getProjects().pipe(
            map((projects) =>
              projects.map(
                ({
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
                  technologies,
                }),
              ),
            ),
          )
      },
    },
  )
