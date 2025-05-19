import { map, Observable } from 'rxjs'
import { inject, InjectionToken } from '@angular/core'
import { JsonResumeService } from '../json-resume/json-resume.service'
import { ADAPT_JSON_RESUME_WORK } from './adapt-json-resume-work'
import { Experience } from './experience'

/** @visibleForTesting */
export interface ExperienceService {
  getAll(): Observable<readonly Experience[]>
}

export const EXPERIENCE_SERVICE = new InjectionToken<ExperienceService>(
  /* istanbul ignore next */
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
