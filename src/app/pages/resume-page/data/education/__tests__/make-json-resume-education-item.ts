import resume from '@/data/resume.json'
import { JsonResumeEducationItem } from '../../json-resume/json-resume-types'

const sampleJsonResumeEducationItem = resume.education[0]

export const makeJsonResumeEducationItem = (
  overrides?: Partial<JsonResumeEducationItem>,
): JsonResumeEducationItem =>
  ({
    ...sampleJsonResumeEducationItem,
    ...overrides,
  }) as JsonResumeEducationItem
