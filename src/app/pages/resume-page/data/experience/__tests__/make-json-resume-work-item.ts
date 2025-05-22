import resume from '@/data/resume.json'
import { JsonResumeWorkItem } from '../../json-resume/json-resume-types'

const sampleJsonResumeWorkItem = resume.work[0]

export function makeJsonResumeWorkItem(
  overrides?: Partial<JsonResumeWorkItem>,
): JsonResumeWorkItem {
  return {
    ...sampleJsonResumeWorkItem,
    ...overrides,
  } as JsonResumeWorkItem
}
