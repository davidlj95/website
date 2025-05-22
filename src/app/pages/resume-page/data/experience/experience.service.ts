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
      const resumeConfigService = inject(RESUME_CONFIG_SERVICE)
      const compactHighlights = makeCompactHighlights()
      const compactTechnologies = makeCompactTechnologies()
      const jsonResumeExperience$ = inject(GET_JSON_RESUME_EXPERIENCES)().pipe(
        combineLatestWith(resumeConfigService.compact$),
        map(([experiences, isCompact]) =>
          isCompact
            ? experiences.map(compactHighlights).map(compactTechnologies)
            : experiences,
        ),
      )
      return {
        getAll: () => jsonResumeExperience$,
      }
    },
  },
)

type ExperienceFilter = (experience: Experience) => Experience
const makeCompactHighlights = (): ExperienceFilter => {
  const now = new Date()
  const someYearsAgo = new Date(
    now.getFullYear() - COMPACT_HIGHLIGHTS_YEARS_OLD,
    now.getMonth(),
    now.getDate(),
  )
  return ({ highlights, dateRange, ...rest }: Experience): Experience => {
    const { end } = dateRange
    const compactHighlights =
      end && end < someYearsAgo
        ? []
        : highlights.slice(0, COMPACT_HIGHLIGHTS_LENGTH)
    return { ...rest, dateRange, highlights: compactHighlights }
  }
}
/** @visibleForTesting */
export const COMPACT_HIGHLIGHTS_LENGTH = 3
/** @visibleForTesting */
export const COMPACT_HIGHLIGHTS_YEARS_OLD = 5

const makeCompactTechnologies = (): ExperienceFilter => {
  const now = new Date()
  const someYearsAgo = new Date(
    now.getFullYear() - COMPACT_TECHS_YEARS_OLD,
    now.getMonth(),
    now.getDate(),
  )
  return ({ technologies, dateRange, ...rest }: Experience): Experience => {
    const { end } = dateRange
    const compactTechnologies =
      end && end < someYearsAgo
        ? []
        : technologies.slice(0, COMPACT_TECHS_LENGTH)
    return { ...rest, dateRange, technologies: compactTechnologies }
  }
}
/** @visibleForTesting */
export const COMPACT_TECHS_LENGTH = 8
/** @visibleForTesting */
export const COMPACT_TECHS_YEARS_OLD = 5
