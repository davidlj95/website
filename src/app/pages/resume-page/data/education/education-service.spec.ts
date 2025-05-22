import { serviceTestSetup } from '@/test/helpers/service-test-setup'
import { EDUCATION_SERVICE } from './education-service'
import { MockProvider } from 'ng-mocks'
import { lastValueFrom, of } from 'rxjs'
import { makeEducation } from './__tests__/make-education'
import { Education } from './education'
import { GET_JSON_RESUME_EDUCATIONS } from './get-json-resume-educations'

describe('EducationService', () => {
  it('should return educations from JSON resume', async () => {
    const educations = [
      makeEducation({ score: 'edu 1' }),
      makeEducation({ score: 'edu 2' }),
    ]

    const sut = makeSut({ jsonResumeEducations: educations })

    expect(await lastValueFrom(sut.getAll())).toEqual(educations)
  })
})

const makeSut = ({
  jsonResumeEducations,
}: { jsonResumeEducations?: readonly Education[] } = {}) =>
  serviceTestSetup(EDUCATION_SERVICE, {
    providers: [
      MockProvider(GET_JSON_RESUME_EDUCATIONS, () =>
        of(jsonResumeEducations ?? []),
      ),
    ],
  })
