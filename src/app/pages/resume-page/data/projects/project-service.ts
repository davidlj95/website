import { inject, InjectionToken } from '@angular/core'
import { Project } from './project'
import { GET_JSON_RESUME_PROJECTS } from './get-json-resume-projects'
import { map, Observable } from 'rxjs'

/** @visibleForTesting */
export interface ProjectService {
  getByCompanyName(name: string): Observable<readonly Project[]>
  getAll: () => Observable<readonly Project[]>
}

export const PROJECT_SERVICE = new InjectionToken<ProjectService>(
  /* istanbul ignore next */
  isDevMode ? 'ProjectService' : 'rPS',
  {
    factory: () => {
      const jsonResumeProjects$ = inject(GET_JSON_RESUME_PROJECTS)()
      return {
        getByCompanyName: (name) =>
          jsonResumeProjects$.pipe(
            map((projects) =>
              projects.filter((project) => project.entity === name),
            ),
          ),
        getAll: () => jsonResumeProjects$,
      }
    },
  },
)
