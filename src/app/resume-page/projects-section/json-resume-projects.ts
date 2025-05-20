import { InjectionToken } from '@angular/core'
import resume from '@/data/resume.json'
import { JsonResumeProjects } from '../json-resume/types'

export const JSON_RESUME_PROJECTS = new InjectionToken<JsonResumeProjects>(
  /* istanbul ignore next */
  isDevMode ? 'JSON Resume projects' : 'JRPs',
  {
    factory: () => resume.projects,
  },
)
