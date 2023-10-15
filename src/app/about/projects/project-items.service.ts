import { Inject, Injectable, InjectionToken } from '@angular/core'
import { ProjectItem } from './project-item/project-item'
import resume from '../../../../assets/resume.json'
import { JsonResumeProjectItemAdapterService } from './json-resume-project-item-adapter.service'

@Injectable({
  providedIn: 'root',
})
export class ProjectItemsService {
  constructor(
    @Inject(JSON_RESUME_PROJECTS)
    private jsonResumeProjects: JsonResumeProjects,
    private adapter: JsonResumeProjectItemAdapterService,
  ) {}

  get(): ReadonlyArray<ProjectItem> {
    return this.jsonResumeProjects.map((jsonResumeProject) =>
      this.adapter.adapt(jsonResumeProject),
    )
  }
}

export const JSON_RESUME_PROJECTS = new InjectionToken<JsonResumeProjects>(
  'JSON Resume projects section',
  {
    factory: () => resume.projects,
  },
)
export type JsonResumeProjects = typeof resume.projects
