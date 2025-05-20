import { inject, InjectionToken } from '@angular/core'
import { Education } from './education'
import { ADAPT_JSON_RESUME_EDUCATION } from './adapt-json-resume-education'
import { JsonResumeService } from '../json-resume/json-resume.service'
import { map, Observable } from 'rxjs'

type GetEducationItems = () => Observable<readonly Education[]>
export const GET_EDUCATION_ITEMS = new InjectionToken<GetEducationItems>(
  /* istanbul ignore next */
  isDevMode ? 'GetEducationItems' : 'GEI',
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
