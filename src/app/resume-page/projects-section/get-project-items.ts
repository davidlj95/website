import { inject, InjectionToken } from '@angular/core'
import { ProjectItem } from './project-item/project-item'
import { ADAPT_JSON_RESUME_PROJECT } from './adapt-json-resume-project'
import { JSON_RESUME_PROJECTS } from './json-resume-projects'

export type GetProjectItems = () => ReadonlyArray<ProjectItem>

export const GET_PROJECT_ITEMS = new InjectionToken<GetProjectItems>(
  /* istanbul ignore next */
  isDevMode ? 'GetProjectItems' : 'GPI',
  {
    factory: () => {
      const projects = inject(JSON_RESUME_PROJECTS)
      const adapter = inject(ADAPT_JSON_RESUME_PROJECT)
      return () => projects.map((project) => adapter(project))
    },
  },
)
