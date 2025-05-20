import resume from '@/data/resume.json'
import { JsonResumeProject } from '../../json-resume/types'

const sampleJsonResumeProject = resume.projects[0]

export function makeJsonResumeProject(
  overrides: Partial<JsonResumeProject> = {},
): JsonResumeProject {
  return {
    ...sampleJsonResumeProject,
    ...overrides,
  } as JsonResumeProject
}
