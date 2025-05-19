import { map, Observable } from 'rxjs'
import { inject, InjectionToken } from '@angular/core'
import { JsonResumeService } from '../json-resume/json-resume.service'
import { Organization } from './organization'
import { DateRange } from './date-range'
import { ProjectItem } from '../projects-section/project-item/project-item'
import { ADAPT_JSON_RESUME_WORK } from './adapt-json-resume-work'

export interface ExperienceService {
  getAll(): Observable<readonly Experience[]>
}

export interface Experience {
  readonly company: Organization
  readonly position: string
  readonly dateRange: DateRange
  readonly summary: string
  readonly highlights: readonly string[]
  readonly tags: readonly string[]
  readonly projects: readonly ProjectItem[]
}

export const EXPERIENCE_SERVICE = new InjectionToken<ExperienceService>(
  isDevMode ? 'ExperienceService' : 'rXS',
  {
    factory: () => {
      const jsonResume = inject(JsonResumeService)
      const adaptJsonResumeWork = inject(ADAPT_JSON_RESUME_WORK)
      return {
        // 👇 JSON Resume Schema of "work"
        // https://github.com/jsonresume/resume-schema/blob/v1.0.0/schema.json#L100-L149
        // Includes additional fields though
        getAll: () =>
          jsonResume
            .getWork()
            .pipe(map((work) => work.map(adaptJsonResumeWork))),
      }
    },
  },
)
