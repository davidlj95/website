import { inject, InjectionToken } from '@angular/core'
import { Education } from './education'
import { ADAPT_JSON_RESUME_EDUCATION } from './adapt-json-resume-education'
import { JsonResumeService } from '../json-resume/json-resume.service'
import { map, Observable } from 'rxjs'

export type EducationService = () => Observable<readonly Education[]>
export const EDUCATION_SERVICE = new InjectionToken<EducationService>(
  /* istanbul ignore next */
  isDevMode ? 'EducationService' : 'rES',
  {
    factory: () => {
      const jsonResumeService = inject(JsonResumeService)
      const adapter = inject(ADAPT_JSON_RESUME_EDUCATION)
      return () =>
        jsonResumeService
          .getEducation()
          .pipe(map((education) => education.map(adapter)))
    },
  },
)
