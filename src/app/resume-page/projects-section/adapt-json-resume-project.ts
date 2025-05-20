import { inject, InjectionToken } from '@angular/core'
import { Project, Stack } from '../data/project'
import { DateRange } from '../data/date-range'
import { RELATIVIZE_PRODUCTION_URL } from '@/common/relativize-production-url'
import { JsonResumeProject } from './json-resume-projects'

/** @visibleForTesting */
export type AdaptJsonResumeProject = (project: JsonResumeProject) => Project
export const ADAPT_JSON_RESUME_PROJECT =
  new InjectionToken<AdaptJsonResumeProject>(
    /* istanbul ignore next */
    isDevMode ? 'AdaptJsonResumeProject' : 'AJRP',
    {
      factory: () => {
        const relativizeUrl = inject(RELATIVIZE_PRODUCTION_URL)
        return (project) =>
          new Project({
            name: project.name,
            description: project.description,
            dateRange: new DateRange(
              new Date(project.startDate),
              project.endDate ? new Date(project.endDate) : undefined,
            ),
            website: project.url ? new URL(project.url) : undefined,
            roles: project.roles,
            entity: project.entity,
            imageSrc: project.image
              ? relativizeUrl(new URL(project.image))
              : undefined,
            stack: project.stack ? mapStack(project.stack) : undefined,
            technologies: project.technologies,
          })
      },
    },
  )
const mapStack = (stack: string): Stack => {
  if (Object.values(Stack).includes(stack as Stack)) {
    return stack as Stack
  }
  throw new InvalidStackValueError(stack)
}

/** @visibleForTesting */
export class InvalidStackValueError extends Error {
  constructor(value: string) {
    super(`Invalid stack value: '${value}'`)
  }
}
