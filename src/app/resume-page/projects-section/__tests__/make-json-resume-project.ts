import resume from '../../../../../assets/resume.json'
import { JsonResumeProject } from '../json-resume-projects'

const sampleJsonResumeProject = resume.projects[0]

export function makeJsonResumeProject(
  overrides: Partial<JsonResumeProject> = {},
): JsonResumeProject {
  return {
    ...sampleJsonResumeProject,
    ...overrides,
  } as JsonResumeProject
}