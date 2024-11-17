import { MockProvider } from 'ng-mocks'
import { serviceTestSetup } from '@/test/helpers/service-test-setup'
import {
  GET_LANGUAGE_ITEMS,
  JSON_RESUME_LANGUAGES,
  JsonResumeLanguages,
} from './get-language-items'
import {
  ADAPT_JSON_RESUME_LANGUAGE,
  AdaptJsonResumeLanguage,
  JsonResumeLanguage,
} from './adapt-json-resume-language'
import { LanguageItem } from './language-item/language-item'

describe('GetLanguageItems', () => {
  it('should be created', () => {
    expect(makeSut()).toBeTruthy()
  })

  it('should return adapted items from JSON Resume', () => {
    const jsonResumeLanguages = [
      'item-1' as unknown as JsonResumeLanguage,
      'item-2' as unknown as JsonResumeLanguage,
    ]
    const expectedLanguageItems =
      jsonResumeLanguages as unknown as readonly LanguageItem[]
    const adaptJsonResumeLanguage = jasmine
      .createSpy<AdaptJsonResumeLanguage>()
      .and.returnValues(...expectedLanguageItems)
    const sut = makeSut({
      jsonResumeLanguages,
      adaptJsonResumeLanguage,
    })

    const items = sut()

    expect(items).toEqual(expectedLanguageItems)
    expect(adaptJsonResumeLanguage).toHaveBeenCalledTimes(
      jsonResumeLanguages.length,
    )
  })
})

const makeSut = (
  opts: {
    jsonResumeLanguages?: JsonResumeLanguages
    adaptJsonResumeLanguage?: AdaptJsonResumeLanguage
  } = {},
) =>
  serviceTestSetup(GET_LANGUAGE_ITEMS, {
    providers: [
      opts.jsonResumeLanguages
        ? MockProvider(JSON_RESUME_LANGUAGES, opts.jsonResumeLanguages)
        : [],
      opts.adaptJsonResumeLanguage
        ? MockProvider(ADAPT_JSON_RESUME_LANGUAGE, opts.adaptJsonResumeLanguage)
        : [],
    ],
  })
