import {
  EducationItemsService,
  JSON_RESUME_EDUCATION,
  JsonResumeEducation,
} from './education-items.service'
import { MockProvider } from 'ng-mocks'
import { EducationItem } from './education-item/education-item'
import { serviceTestSetup } from '@/test/helpers/service-test-setup'
import {
  ADAPT_JSON_RESUME_EDUCATION,
  AdaptJsonResumeEducation,
  JsonResumeEducationItem,
} from './adapt-json-resume-education'

describe('EducationItemsService', () => {
  it('should be created', () => {
    expect(makeSut()).toBeTruthy()
  })

  describe('getEducationItems', () => {
    it('should return adapted items from JSON Resume', () => {
      const jsonResumeEducations = [
        'item-1' as unknown as JsonResumeEducationItem,
        'item-2' as unknown as JsonResumeEducationItem,
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

      const items = sut.getEducationItems()

      expect(items).toEqual(expectedEducationItems)
      expect(adaptJsonResumeEducation).toHaveBeenCalledTimes(
        jsonResumeEducations.length,
      )
    })
  })
})

const makeSut = (
  opts: {
    jsonResumeEducations?: JsonResumeEducation
    adaptJsonResumeEducation?: AdaptJsonResumeEducation
  } = {},
) =>
  serviceTestSetup(EducationItemsService, {
    providers: [
      opts.jsonResumeEducations
        ? MockProvider(JSON_RESUME_EDUCATION, opts.jsonResumeEducations)
        : [],
      opts.adaptJsonResumeEducation
        ? MockProvider(
            ADAPT_JSON_RESUME_EDUCATION,
            opts.adaptJsonResumeEducation,
          )
        : [],
    ],
  })
