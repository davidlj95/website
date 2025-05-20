import { EDUCATION_SERVICE } from './education-service'
import { MockProvider } from 'ng-mocks'
import { Education } from './education'
import { serviceTestSetup } from '@/test/helpers/service-test-setup'
import {
  ADAPT_JSON_RESUME_EDUCATION,
  AdaptJsonResumeEducation,
} from './adapt-json-resume-education'
import { JsonResumeService } from '../json-resume/json-resume.service'
import { firstValueFrom, of } from 'rxjs'
import {
  JsonResumeEducation,
  JsonResumeEducationItem,
} from '../json-resume/types'

describe('EducationService', () => {
  it('should be created', () => {
    expect(makeSut()).toBeTruthy()
  })

  it('should return adapted educations from JSON Resume', async () => {
    const education = [
      'item-1' as unknown as JsonResumeEducationItem,
      'item-2' as unknown as JsonResumeEducationItem,
    ]
    const expectedEducations = education as unknown as readonly Education[]

    const adaptJsonResumeEducation = jasmine
      .createSpy<AdaptJsonResumeEducation>()
      .and.returnValues(...expectedEducations)

    const sut = makeSut({
      education,
      adaptJsonResumeEducation,
    })

    const educations = await firstValueFrom(sut.getAll())

    expect(educations).toEqual(expectedEducations)
    expect(adaptJsonResumeEducation).toHaveBeenCalledTimes(education.length)
  })
})

const makeSut = ({
  education,
  adaptJsonResumeEducation,
}: {
  education?: JsonResumeEducation
  adaptJsonResumeEducation?: AdaptJsonResumeEducation
} = {}) =>
  serviceTestSetup(EDUCATION_SERVICE, {
    providers: [
      education
        ? MockProvider(JsonResumeService, { getEducation: () => of(education) })
        : [],
      adaptJsonResumeEducation
        ? MockProvider(ADAPT_JSON_RESUME_EDUCATION, adaptJsonResumeEducation)
        : [],
    ],
  })
