import { MockProvider } from 'ng-mocks'
import { serviceTestSetup } from '@/test/helpers/service-test-setup'
import { LANGUAGE_SERVICE } from './language-service'
import {
  ADAPT_JSON_RESUME_LANGUAGE,
  AdaptJsonResumeLanguage,
} from './adapt-json-resume-language'
import { Language } from './language'
import { JsonResumeLanguage, JsonResumeLanguages } from '../json-resume/types'
import { JsonResumeService } from '../json-resume/json-resume.service'
import { lastValueFrom, of } from 'rxjs'

describe('LanguageService', () => {
  it('should be created', () => {
    expect(makeSut()).toBeTruthy()
  })

  it('should return adapted languages from JSON Resume', async () => {
    const languages = [
      'item-1' as unknown as JsonResumeLanguage,
      'item-2' as unknown as JsonResumeLanguage,
    ]
    const expectedLanguages = languages as unknown as readonly Language[]

    const adaptJsonResumeLanguage = jasmine
      .createSpy<AdaptJsonResumeLanguage>()
      .and.returnValues(...expectedLanguages)

    const sut = makeSut({
      languages,
      adaptJsonResumeLanguage,
    })

    const actual = await lastValueFrom(sut.getAll())

    expect(actual).toEqual(expectedLanguages)
    expect(adaptJsonResumeLanguage).toHaveBeenCalledTimes(languages.length)
  })
})

const makeSut = ({
  languages,
  adaptJsonResumeLanguage,
}: {
  languages?: JsonResumeLanguages
  adaptJsonResumeLanguage?: AdaptJsonResumeLanguage
} = {}) =>
  serviceTestSetup(LANGUAGE_SERVICE, {
    providers: [
      languages
        ? MockProvider(JsonResumeService, { getLanguages: () => of(languages) })
        : [],
      adaptJsonResumeLanguage
        ? MockProvider(ADAPT_JSON_RESUME_LANGUAGE, adaptJsonResumeLanguage)
        : [],
    ],
  })
