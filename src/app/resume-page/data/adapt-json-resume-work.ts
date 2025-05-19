import { inject, InjectionToken } from '@angular/core'
import { DateRange } from './date-range'
import { RELATIVIZE_PRODUCTION_URL } from '@/common/relativize-production-url'
import { JSON_RESUME_PROJECTS } from '../projects-section/json-resume-projects'
import { ADAPT_JSON_RESUME_PROJECT } from '../projects-section/adapt-json-resume-project'
import { Experience } from './experience-service'
import { JsonResumeWorkItem } from '../json-resume/json-resume.service'

/** @visibleForTesting */
export type AdaptJsonResumeWork = (work: JsonResumeWorkItem) => Experience
export const ADAPT_JSON_RESUME_WORK = new InjectionToken<AdaptJsonResumeWork>(
  /* istanbul ignore next */
  isDevMode ? 'AdaptJsonResumeWork' : 'AJRW',
  {
    factory: () => {
      const projects = inject(JSON_RESUME_PROJECTS)
      const adaptProject = inject(ADAPT_JSON_RESUME_PROJECT)
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
        tags: mapTags(tags),
        dateRange: new DateRange(
          new Date(startDate),
          !endDate ? undefined : new Date(endDate),
        ),
        projects: projects
          .filter((project) => project.entity === name)
          .map((project) => adaptProject(project)),
      })
    },
  },
)

const mapTags = (jsonTags: readonly string[] | undefined) => {
  const tags = jsonTags ?? []
  return !tags.includes(FREELANCE_TAG) && !tags.includes(EMPLOYEE_TAG)
    ? [...tags, EMPLOYEE_TAG]
    : tags
}

export const FREELANCE_TAG = 'freelance'
export const EMPLOYEE_TAG = 'employee'
