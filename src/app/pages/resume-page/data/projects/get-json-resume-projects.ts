import { inject, InjectionToken } from '@angular/core'
import { Project } from './project'
import { RELATIVIZE_PRODUCTION_URL } from '@/common/relativize-production-url'
import { tagsToAttributes } from '../attribute'
import { map, Observable } from 'rxjs'
import { JsonResumeService } from '../json-resume/json-resume.service'
import { dateRangeFromStrings } from '../date-range'
import { urlOrUndefined } from '../url-or-undefined'

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
                  dateRange: dateRangeFromStrings(startDate, endDate),
                  website: urlOrUndefined(url),
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
