import { JsonResumeProject } from '../adapt-json-resume-project'
import resume from '../../../../../assets/resume.json'

const sampleJsonResumeProject = resume.projects[0]

export function makeJsonResumeProject(
  overrides: Partial<JsonResumeProject> = {},
): JsonResumeProject {
  return {
    ...sampleJsonResumeProject,
    ...overrides,
  } as JsonResumeProject
}
