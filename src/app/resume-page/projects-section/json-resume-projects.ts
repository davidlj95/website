import { InjectionToken } from '@angular/core'
import resume from '@/data/resume.json'

export const JSON_RESUME_PROJECTS = new InjectionToken<JsonResumeProjects>(
  /* istanbul ignore next */
  isDevMode ? 'JSON Resume projects' : 'JRPs',
  {
    factory: () => resume.projects,
  },
)
/** @visibleForTesting */
export type JsonResumeProjects = typeof resume.projects
export type JsonResumeProject = (typeof resume.projects)[number]
