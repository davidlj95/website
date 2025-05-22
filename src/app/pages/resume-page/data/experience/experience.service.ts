import { combineLatestWith, map, Observable } from 'rxjs'
import { inject, InjectionToken } from '@angular/core'
import { RESUME_CONFIG_SERVICE } from '../resume-config.service'
import { Experience } from './experience'
import { GET_JSON_RESUME_EXPERIENCES } from './get-json-resume-experiences'

interface ExperienceService {
  getAll(): Observable<readonly Experience[]>
}
export const EXPERIENCE_SERVICE = new InjectionToken<ExperienceService>(
  /* istanbul ignore next */
  isDevMode ? 'ExperienceService' : 'rXS',
  {
    factory: () => {
      const now = new Date()
      const fiveYearsAgo = new Date(
        now.getFullYear() - COMPACT_HIGHLIGHTS_YEARS_OLD,
        now.getMonth(),
        now.getDate(),
      )
      const resumeConfigService = inject(RESUME_CONFIG_SERVICE)
      const jsonResumeExperience$ = inject(GET_JSON_RESUME_EXPERIENCES)().pipe(
        combineLatestWith(resumeConfigService.compact$),
        map(([experiences, isCompact]) =>
          isCompact
            ? experiences.map((experience) =>
                experience.dateRange.end &&
                experience.dateRange.end < fiveYearsAgo
                  ? {
                      ...experience,
                      highlights: [],
                    }
                  : {
                      ...experience,
                      highlights: experience.highlights.slice(
                        0,
                        COMPACT_HIGHLIGHTS_LENGTH,
                      ),
                    },
              )
            : experiences,
        ),
      )
      return {
        getAll: () => jsonResumeExperience$,
      }
    },
  },
)

/** @visibleForTesting */
export const COMPACT_HIGHLIGHTS_LENGTH = 3
/** @visibleForTesting */
export const COMPACT_HIGHLIGHTS_YEARS_OLD = 5
