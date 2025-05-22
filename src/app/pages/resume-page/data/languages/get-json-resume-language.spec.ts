import { serviceTestSetup } from '@/test/helpers/service-test-setup'
import { GET_JSON_RESUME_LANGUAGES } from './get-json-resume-languages'
import { JsonResumeLanguages } from '../json-resume/json-resume-types'
import { makeJsonResumeLanguage } from './__tests__/make-json-resume-language'
import { MockProvider } from 'ng-mocks'
import { JsonResumeService } from '../json-resume/json-resume.service'
import { lastValueFrom, of } from 'rxjs'

describe('GetJsonResumeLanguage', () => {
  it('should be created', () => {
    expect(makeSut()).toBeTruthy()
  })

  it('should map language name, fluency, comment and tag', async () => {
    const name = 'English'
    const fluency = 'Real good'
    const comment = 'Lived in Sealand for 4 months'
    const tag = 'es'

    const language = await callSutAndGetFirstItem({
      jsonResumeLanguages: [
        makeJsonResumeLanguage({ language: name, fluency, comment, tag }),
      ],
    })

    expect(language.name).toEqual(name)
    expect(language.fluency).toEqual(fluency)
    expect(language.comment).toEqual(comment)
    expect(language.tag).toEqual(tag)
  })
})

const makeSut = ({
  jsonResumeLanguages,
}: {
  jsonResumeLanguages?: JsonResumeLanguages
} = {}) =>
  serviceTestSetup(GET_JSON_RESUME_LANGUAGES, {
    providers: [
      MockProvider(JsonResumeService, {
        getLanguages: () => of(jsonResumeLanguages ?? []),
      }),
    ],
  })

const callSutAndGetFirstItem = async (
  opts: Parameters<typeof makeSut>[0] = {},
) => (await lastValueFrom(makeSut(opts)()))[0]
