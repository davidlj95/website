import { inject, InjectionToken } from '@angular/core'
import { dateRangeFromStrings } from '../date-range'
import { RELATIVIZE_PRODUCTION_URL } from '@/common/relativize-production-url'
import { Experience } from './experience'
import { tagsToAttributes } from '../attribute'
import { combineLatestWith, map, Observable } from 'rxjs'
import { JsonResumeService } from '../json-resume/json-resume.service'
import { GET_JSON_RESUME_PROJECTS } from '../projects/get-json-resume-projects'
import { urlOrUndefined } from '../url-or-undefined'

type GetJsonResumeExperiences = () => Observable<readonly Experience[]>
export const GET_JSON_RESUME_EXPERIENCES =
  new InjectionToken<GetJsonResumeExperiences>(
    /* istanbul ignore next */
    isDevMode ? 'GetJsonResumeExperiences' : 'GJRE',
    {
      factory: () => {
        const jsonResumeService = inject(JsonResumeService)
        const relativizeUrl = inject(RELATIVIZE_PRODUCTION_URL)
        const jsonResumeProjects$ = inject(GET_JSON_RESUME_PROJECTS)()
        // 👇 JSON Resume Schema of "work"
        // https://github.com/jsonresume/resume-schema/blob/v1.0.0/schema.json#L100-L149
        // Includes additional fields though
        return () =>
          jsonResumeService.getWork().pipe(
            combineLatestWith(jsonResumeProjects$),
            map(([work, projects]) =>
              work.map(
                ({
                  name,
                  image,
                  url,
                  position,
                  summary,
                  highlights,
                  tags,
                  startDate,
                  endDate,
                }): Experience => {
                  const relatedProjects = projects.filter(
                    (project) => project.entity === name,
                  )
                  const technologies = [
                    ...new Set(
                      relatedProjects.flatMap(
                        ({ technologies }) => technologies,
                      ),
                    ),
                  ]
                  return {
                    company: {
                      name,
                      imageSrc: relativizeUrl(new URL(image)),
                      website: urlOrUndefined(url),
                    },
                    position,
                    summary,
                    highlights: highlights ?? [],
                    attributes: tagsToAttributes(tags ?? []),
                    dateRange: dateRangeFromStrings(startDate, endDate),
                    relatedProjects: relatedProjects.map(({ name }) => name),
                    technologies,
                  }
                },
              ),
            ),
          )
      },
    },
  )
