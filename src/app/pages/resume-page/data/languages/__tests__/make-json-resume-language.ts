import resume from '@/data/resume.json'
import { JsonResumeLanguage } from '../../json-resume/json-resume-types'

const sampleJsonResumeLanguage = resume.languages[0]

export const makeJsonResumeLanguage = (
  overrides?: Partial<JsonResumeLanguage>,
): JsonResumeLanguage =>
  ({
    ...sampleJsonResumeLanguage,
    ...overrides,
  }) as JsonResumeLanguage
