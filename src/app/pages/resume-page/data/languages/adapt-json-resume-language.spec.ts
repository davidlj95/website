import { serviceTestSetup } from '@/test/helpers/service-test-setup'
import { ADAPT_JSON_RESUME_LANGUAGE } from './adapt-json-resume-language'
import resume from '@/data/resume.json'
import { JsonResumeLanguage } from '../json-resume/types'

describe('AdaptJsonResumeLanguage', () => {
  it('should be created', () => {
    expect(makeSut()).toBeTruthy()
  })

  it('should map language name', () => {
    const language = 'English'

    const item = makeSut()(makeJsonResumeLanguage({ language }))

    expect(item.name).toEqual(language)
  })

  it('should map fluency', () => {
    const fluency = 'Real good'

    const item = makeSut()(makeJsonResumeLanguage({ fluency }))

    expect(item.fluency).toEqual(fluency)
  })

  it('should map comment', () => {
    const comment = 'Lived in Sealand for 4 months'

    const item = makeSut()(makeJsonResumeLanguage({ comment }))

    expect(item.comment).toEqual(comment)
  })

  it('should map tag', () => {
    const comment = 'es'

    const item = makeSut()(makeJsonResumeLanguage({ comment }))

    expect(item.tag).toEqual(comment)
  })
})

const makeSut = () => serviceTestSetup(ADAPT_JSON_RESUME_LANGUAGE)

const sampleJsonResumeLanguage = resume.languages[0]

const makeJsonResumeLanguage = (
  overrides?: Partial<JsonResumeLanguage>,
): JsonResumeLanguage =>
  ({
    ...sampleJsonResumeLanguage,
    ...overrides,
  }) as JsonResumeLanguage
