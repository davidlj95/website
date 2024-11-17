import {
  GET_EXPERIENCE_ITEMS,
  JSON_RESUME_WORKS,
  JsonResumeWorks,
} from './get-experience-items'
import { MockProvider } from 'ng-mocks'
import {
  ADAPT_JSON_RESUME_WORK,
  AdaptJsonResumeWork,
  JsonResumeWork,
} from './adapt-json-resume-work'
import { ExperienceItem } from './experience-item/experience-item'
import { serviceTestSetup } from '@/test/helpers/service-test-setup'

describe('GetExperienceItems', () => {
  it('should be created', () => {
    expect(makeSut()).toBeTruthy()
  })

  it('should return adapted items from JSON Resume', () => {
    const jsonResumeWorks = [
      'item-1' as unknown as JsonResumeWork,
      'item-2' as unknown as JsonResumeWork,
    ]
    const expectedExperienceItems =
      jsonResumeWorks as unknown as readonly ExperienceItem[]
    const adaptJsonResumeWork = jasmine
      .createSpy<AdaptJsonResumeWork>()
      .and.returnValues(...expectedExperienceItems)
    const sut = makeSut({
      jsonResumeWorks,
      adaptJsonResumeWork,
    })

    const items = sut()

    expect(items).toEqual(expectedExperienceItems)
    expect(adaptJsonResumeWork).toHaveBeenCalledTimes(jsonResumeWorks.length)
  })
})

const makeSut = (
  opts: {
    jsonResumeWorks?: JsonResumeWorks
    adaptJsonResumeWork?: AdaptJsonResumeWork
  } = {},
) =>
  serviceTestSetup(GET_EXPERIENCE_ITEMS, {
    providers: [
      opts.jsonResumeWorks
        ? MockProvider(JSON_RESUME_WORKS, opts.jsonResumeWorks)
        : [],
      opts.adaptJsonResumeWork
        ? MockProvider(ADAPT_JSON_RESUME_WORK, opts.adaptJsonResumeWork)
        : [],
    ],
  })
