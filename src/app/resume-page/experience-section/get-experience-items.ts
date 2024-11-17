import { inject, InjectionToken } from '@angular/core'
import resume from '@/data/resume.json'
import { ADAPT_JSON_RESUME_WORK } from './adapt-json-resume-work'
import { ExperienceItem } from './experience-item/experience-item'

export type GetExperienceItems = () => readonly ExperienceItem[]
export const GET_EXPERIENCE_ITEMS = new InjectionToken<GetExperienceItems>(
  /* istanbul ignore next */
  isDevMode ? 'GetExperienceItems' : 'GEI',
  {
    factory: () => {
      const works = inject(JSON_RESUME_WORKS)
      const adapter = inject(ADAPT_JSON_RESUME_WORK)
      return () => works.map((work) => adapter(work))
    },
  },
)

export const JSON_RESUME_WORKS = new InjectionToken<JsonResumeWorks>(
  /* istanbul ignore next */
  isDevMode ? 'JSON Resume works' : 'JRWs',
  {
    factory: () => resume.work,
  },
)

export type JsonResumeWorks = typeof resume.work
