import { inject, InjectionToken } from '@angular/core'
import resume from '@/data/resume.json'
import { ExperienceItem } from './experience-item/experience-item'
import { Organization } from '../organization'
import { DateRange } from '../date-range/date-range'
import { RELATIVIZE_PRODUCTION_URL } from '@/common/relativize-production-url'
import { JSON_RESUME_PROJECTS } from '../projects-section/json-resume-projects'
import { ADAPT_JSON_RESUME_PROJECT } from '../projects-section/adapt-json-resume-project'

export type AdaptJsonResumeWork = (work: JsonResumeWork) => ExperienceItem
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
      return (work) =>
        new ExperienceItem({
          company: new Organization({
            name: work.name,
            imageSrc: relativizeUrl(new URL(work.image)),
            website: new URL(work.url),
          }),
          position: work.position,
          summary: work.summary,
          highlights: work.highlights,
          dateRange: new DateRange(
            new Date(work.startDate),
            !work.endDate ? undefined : new Date(work.endDate),
          ),
          freelance: work.freelance,
          internship: work.internship,
          promotions: work.promotions,
          morePositions: work.morePositions,
          projects: projects
            .filter((project) => project.entity === work.name)
            .map((project) => adaptProject(project)),
        })
    },
  },
)

export type JsonResumeWork = (typeof resume.work)[number]
