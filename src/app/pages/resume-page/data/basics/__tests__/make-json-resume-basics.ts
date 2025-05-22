import { JsonResumeBasics } from '../../json-resume/json-resume-types'
import RESUME from '@/data/resume.json'

export const makeJsonResumeBasics = (
  overrides: Partial<JsonResumeBasics> = {},
): JsonResumeBasics => ({
  ...RESUME.basics,
  ...overrides,
})
