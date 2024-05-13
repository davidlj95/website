import {
  GET_EDUCATION_ITEMS,
  JSON_RESUME_EDUCATIONS,
  JsonResumeEducations,
} from './get-education-items'
import { MockProvider } from 'ng-mocks'
import { EducationItem } from './education-item/education-item'
import { serviceTestSetup } from '@/test/helpers/service-test-setup'
import {
  ADAPT_JSON_RESUME_EDUCATION,
  AdaptJsonResumeEducation,
  JsonResumeEducation,
} from './adapt-json-resume-education'

describe('GetEducationItems', () => {
  it('should be created', () => {
    expect(makeSut()).toBeTruthy()
  })

  it('should return adapted items from JSON Resume', () => {
    const jsonResumeEducations = [
      'item-1' as unknown as JsonResumeEducation,
      'item-2' as unknown as JsonResumeEducation,
    ]
    const expectedEducationItems =
      jsonResumeEducations as unknown as ReadonlyArray<EducationItem>
    const adaptJsonResumeEducation = jasmine
      .createSpy<AdaptJsonResumeEducation>()
      .and.returnValues(...expectedEducationItems)
    const sut = makeSut({
      jsonResumeEducations,
      adaptJsonResumeEducation,
    })

    const items = sut()

    expect(items).toEqual(expectedEducationItems)
    expect(adaptJsonResumeEducation).toHaveBeenCalledTimes(
      jsonResumeEducations.length,
    )
  })
})

const makeSut = (
  opts: {
    jsonResumeEducations?: JsonResumeEducations
    adaptJsonResumeEducation?: AdaptJsonResumeEducation
  } = {},
) =>
  serviceTestSetup(GET_EDUCATION_ITEMS, {
    providers: [
      opts.jsonResumeEducations
        ? MockProvider(JSON_RESUME_EDUCATIONS, opts.jsonResumeEducations)
        : [],
      opts.adaptJsonResumeEducation
        ? MockProvider(
            ADAPT_JSON_RESUME_EDUCATION,
            opts.adaptJsonResumeEducation,
          )
        : [],
    ],
  })
