import { inject, InjectionToken } from '@angular/core'
import { Project } from './project'
import { ADAPT_JSON_RESUME_PROJECT } from './adapt-json-resume-project'
import { map, Observable } from 'rxjs'
import { JsonResumeService } from '../json-resume/json-resume.service'

export type GetProjectItems = () => Observable<readonly Project[]>

export const GET_PROJECT_ITEMS = new InjectionToken<GetProjectItems>(
  /* istanbul ignore next */
  isDevMode ? 'GetProjectItems' : 'GPI',
  {
    factory: () => {
      const jsonResumeService = inject(JsonResumeService)
      const adapter = inject(ADAPT_JSON_RESUME_PROJECT)
      return () =>
        jsonResumeService
          .getProjects()
          .pipe(map((projects) => projects.map((project) => adapter(project))))
    },
  },
)
