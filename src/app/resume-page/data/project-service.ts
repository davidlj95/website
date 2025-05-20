import { inject, InjectionToken } from '@angular/core'
import { Project } from './project'
import { ADAPT_JSON_RESUME_PROJECT } from './adapt-json-resume-project'
import { map, Observable } from 'rxjs'
import { JsonResumeService } from '../json-resume/json-resume.service'

/** @visibleForTesting */
export interface ProjectService {
  getAll: () => Observable<readonly Project[]>
}

export const PROJECT_SERVICE = new InjectionToken<ProjectService>(
  /* istanbul ignore next */
  isDevMode ? 'ProjectService' : 'rPS',
  {
    factory: () => {
      const jsonResumeService = inject(JsonResumeService)
      const adapter = inject(ADAPT_JSON_RESUME_PROJECT)
      return {
        getAll: () =>
          jsonResumeService
            .getProjects()
            .pipe(
              map((projects) => projects.map((project) => adapter(project))),
            ),
      }
    },
  },
)
