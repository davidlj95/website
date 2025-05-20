import { inject, InjectionToken } from '@angular/core'
import { Project } from './project'
import { ADAPT_JSON_RESUME_PROJECT } from './adapt-json-resume-project'
import { map, Observable } from 'rxjs'
import { JsonResumeService } from '../json-resume/json-resume.service'
import { JsonResumeProjects } from '../json-resume/types'

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
      const jsonResumeService = inject(JsonResumeService)
      const adapter = inject(ADAPT_JSON_RESUME_PROJECT)
      const mapJsonResumeProjects = map((projects: JsonResumeProjects) =>
        projects.map((project) => adapter(project)),
      )
      return {
        getByCompanyName: (name) =>
          jsonResumeService.getProjects().pipe(
            map((projects) =>
              projects.filter((project) => project.entity === name),
            ),
            mapJsonResumeProjects,
          ),
        getAll: () =>
          jsonResumeService.getProjects().pipe(mapJsonResumeProjects),
      }
    },
  },
)
