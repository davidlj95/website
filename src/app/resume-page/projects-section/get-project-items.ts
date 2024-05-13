import { inject, InjectionToken } from '@angular/core'
import { ProjectItem } from './project-item/project-item'
import resume from '../../../../assets/resume.json'
import { ADAPT_JSON_RESUME_PROJECT } from './adapt-json-resume-project'

export type GetProjectItems = () => ReadonlyArray<ProjectItem>

export const GET_PROJECT_ITEMS = new InjectionToken<GetProjectItems>(
  isDevMode ? 'GetProjectItems' : 'GPI',
  {
    factory: () => {
      const projects = inject(JSON_RESUME_PROJECTS)
      const adapter = inject(ADAPT_JSON_RESUME_PROJECT)
      return () => projects.map((project) => adapter(project))
    },
  },
)

export const JSON_RESUME_PROJECTS = new InjectionToken<JsonResumeProjects>(
  isDevMode ? 'JSON Resume projects' : 'JRPs',
  {
    factory: () => resume.projects,
  },
)
export type JsonResumeProjects = typeof resume.projects
