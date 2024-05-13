import { inject, InjectionToken } from '@angular/core'
import resume from '../../../../assets/resume.json'
import { ProjectItem, Stack } from './project-item/project-item'
import { DateRange } from '../date-range/date-range'
import { RELATIVIZE_PRODUCTION_URL } from '@/common/relativize-production-url'

export type AdaptJsonResumeProject = (project: JsonResumeProject) => ProjectItem
export const ADAPT_JSON_RESUME_PROJECT =
  new InjectionToken<AdaptJsonResumeProject>(
    isDevMode ? 'AdaptJsonResumeProject' : 'AJRP',
    {
      factory: () => {
        const relativizeUrl = inject(RELATIVIZE_PRODUCTION_URL)
        return (project) =>
          new ProjectItem({
            name: project.name,
            description: project.description,
            dateRange: new DateRange(
              new Date(project.startDate),
              project.endDate ? new Date(project.endDate) : undefined,
            ),
            website: project.url ? new URL(project.url) : undefined,
            roles: project.roles,
            imageSrc: project.image
              ? relativizeUrl(new URL(project.image))
              : undefined,
            stack: project.stack ? mapStack(project.stack) : undefined,
            technologies: project.technologies.map((technology) => ({
              slug: technology.id,
              version: technology.version,
            })),
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

export class InvalidStackValueError extends Error {
  constructor(value: string) {
    super(`Invalid stack value: '${value}'`)
  }
}

export type JsonResumeProject = (typeof resume.projects)[number]
