import { combineLatestWith, map, Observable } from 'rxjs'
import { Education } from './education'
import { inject, InjectionToken } from '@angular/core'
import { GET_JSON_RESUME_EDUCATIONS } from './get-json-resume-educations'
import { RESUME_CONFIG_SERVICE } from '../resume-config.service'

interface EducationService {
  getAll(): Observable<readonly Education[]>
}
export const EDUCATION_SERVICE = new InjectionToken<EducationService>(
  /* istanbul ignore next */
  isDevMode ? 'EducationService' : 'rES',
  {
    factory: () => {
      const resumeConfigService = inject(RESUME_CONFIG_SERVICE)
      const jsonResumeEducations$ = inject(GET_JSON_RESUME_EDUCATIONS)().pipe(
        combineLatestWith(resumeConfigService.compact$),
        map(([educations, isCompact]) =>
          isCompact
            ? educations.map((education) => ({
                ...education,
                courses: [],
              }))
            : educations,
        ),
      )
      return {
        getAll: () => jsonResumeEducations$,
      }
    },
  },
)
