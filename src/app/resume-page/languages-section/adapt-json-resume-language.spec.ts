import { serviceTestSetup } from '@/test/helpers/service-test-setup'
import {
  ADAPT_JSON_RESUME_LANGUAGE,
  JsonResumeLanguage,
} from './adapt-json-resume-language'
import resume from '../../../../assets/resume.json'

describe('AdaptJsonResumeLanguage', () => {
  it('should be created', () => {
    expect(makeSut()).toBeTruthy()
  })

  it('should map language name', () => {
    const language = 'English'

    const item = makeSut()(makeJsonResumeLanguageItem({ language }))

    expect(item.name).toEqual(language)
  })

  it('should map fluency', () => {
    const fluency = 'Real good'

    const item = makeSut()(makeJsonResumeLanguageItem({ fluency }))

    expect(item.fluency).toEqual(fluency)
  })

  it('should map comment', () => {
    const comment = 'Lived in Sealand for 4 months'

    const item = makeSut()(makeJsonResumeLanguageItem({ comment }))

    expect(item.comment).toEqual(comment)
  })

  it('should map tag', () => {
    const comment = 'es'

    const item = makeSut()(makeJsonResumeLanguageItem({ comment }))

    expect(item.tag).toEqual(comment)
  })
})

const makeSut = () => serviceTestSetup(ADAPT_JSON_RESUME_LANGUAGE)

const sampleJsonResumeLanguageItem = resume.languages[0]

const makeJsonResumeLanguageItem = (
  overrides?: Partial<JsonResumeLanguage>,
): JsonResumeLanguage =>
  ({
    ...sampleJsonResumeLanguageItem,
    ...overrides,
  }) as JsonResumeLanguage
