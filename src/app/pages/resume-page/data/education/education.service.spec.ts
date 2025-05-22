import { serviceTestSetup } from '@/test/helpers/service-test-setup'
import { EDUCATION_SERVICE } from './education.service'
import { MockProvider } from 'ng-mocks'
import { firstValueFrom, of } from 'rxjs'
import { makeEducation } from './__tests__/make-education'
import { Education } from './education'
import { GET_JSON_RESUME_EDUCATIONS } from './get-json-resume-educations'
import { RESUME_CONFIG_SERVICE } from '../resume-config.service'

describe('EducationService', () => {
  it('should return educations from JSON resume', async () => {
    const educations = [
      makeEducation({ score: 'edu 1' }),
      makeEducation({ score: 'edu 2' }),
    ]

    const sut = makeSut({ jsonResumeEducations: educations })

    expect(await firstValueFrom(sut.getAll())).toEqual(educations)
  })

  it('should return empty courses when compact mode is enabled', async () => {
    const education = makeEducation({ courses: ['a', 'b', 'c'] })

    const sut = makeSut({ jsonResumeEducations: [education], isCompact: true })

    expect(await firstValueFrom(sut.getAll())).toEqual([
      { ...education, courses: [] },
    ])
  })
})

const makeSut = ({
  jsonResumeEducations,
  isCompact,
}: { jsonResumeEducations?: readonly Education[]; isCompact?: boolean } = {}) =>
  serviceTestSetup(EDUCATION_SERVICE, {
    providers: [
      MockProvider(GET_JSON_RESUME_EDUCATIONS, () =>
        of(jsonResumeEducations ?? []),
      ),
      MockProvider(RESUME_CONFIG_SERVICE, { compact$: of(isCompact ?? false) }),
    ],
  })
