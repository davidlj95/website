import { Observable } from 'rxjs'
import { Education } from './education'
import { inject, InjectionToken } from '@angular/core'
import { GET_JSON_RESUME_EDUCATIONS } from './get-json-resume-educations'

interface EducationService {
  getAll(): Observable<readonly Education[]>
}
export const EDUCATION_SERVICE = new InjectionToken<EducationService>(
  /* istanbul ignore next */
  isDevMode ? 'EducationService' : 'rES',
  {
    factory: () => {
      const jsonResumeEducations$ = inject(GET_JSON_RESUME_EDUCATIONS)()
      return {
        getAll: () => jsonResumeEducations$,
      }
    },
  },
)
