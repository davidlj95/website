import {
  ExperienceItemsService,
  JSON_RESUME_WORKS,
  JsonResumeWorks,
} from './experience-items.service'
import { MockProvider } from 'ng-mocks'
import {
  ADAPT_JSON_RESUME_WORK,
  AdaptJsonResumeWork,
  JsonResumeWork,
} from './adapt-json-resume-work'
import { ExperienceItem } from './experience-item/experience-item'
import { serviceTestSetup } from '@/test/helpers/service-test-setup'

describe('ExperienceItemsService', () => {
  it('should be created', () => {
    expect(makeSut()).toBeTruthy()
  })

  describe('getExperienceItems', () => {
    it('should return adapted items from JSON Resume', () => {
      const jsonResumeWorks = [
        'item-1' as unknown as JsonResumeWork,
        'item-2' as unknown as JsonResumeWork,
      ]
      const expectedExperienceItems =
        jsonResumeWorks as unknown as ReadonlyArray<ExperienceItem>
      const adaptJsonResumeWork = jasmine
        .createSpy<AdaptJsonResumeWork>()
        .and.returnValues(...expectedExperienceItems)
      const sut = makeSut({
        jsonResumeWorks,
        adaptJsonResumeWork,
      })

      const items = sut.getExperienceItems()

      expect(items).toEqual(expectedExperienceItems)
      expect(adaptJsonResumeWork).toHaveBeenCalledTimes(jsonResumeWorks.length)
    })
  })
})

const makeSut = (
  opts: {
    jsonResumeWorks?: JsonResumeWorks
    adaptJsonResumeWork?: AdaptJsonResumeWork
  } = {},
) =>
  serviceTestSetup(ExperienceItemsService, {
    providers: [
      opts.jsonResumeWorks
        ? MockProvider(JSON_RESUME_WORKS, opts.jsonResumeWorks)
        : [],
      opts.adaptJsonResumeWork
        ? MockProvider(ADAPT_JSON_RESUME_WORK, opts.adaptJsonResumeWork)
        : [],
    ],
  })
