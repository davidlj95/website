import { TestBed } from '@angular/core/testing'

import {
  ExperienceItemsService,
  JSON_RESUME_WORK,
} from './experience-items.service'
import resume from '../../../../assets/resume.json'
import { MockProvider } from 'ng-mocks'
import { JsonResumeExperienceItemAdapterService } from './json-resume-experience-item-adapter.service'
import { ExperienceItem } from './experience-item/experience-item'

describe('ExperienceItemsService', () => {
  it('should be created', () => {
    TestBed.configureTestingModule({})
    expect(TestBed.inject(ExperienceItemsService)).toBeTruthy()
  })

  describe('getExperienceItems', () => {
    const realResumeWorkItems = resume.work
    const someResumeWorkItems = [
      realResumeWorkItems[0],
      realResumeWorkItems[1],
      realResumeWorkItems[2],
    ]
    let sut: ExperienceItemsService
    let experienceItemAdapter: JsonResumeExperienceItemAdapterService

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [MockProvider(JSON_RESUME_WORK, someResumeWorkItems)],
      })
      experienceItemAdapter = TestBed.inject(
        JsonResumeExperienceItemAdapterService,
      )
      sut = TestBed.inject(ExperienceItemsService)
    })

    it('should return as many as in the JSON resume work section', () => {
      expect(sut.getExperienceItems().length).toBe(someResumeWorkItems.length)
    })

    it('should map each item using the adapter', () => {
      const fakeExperienceItem = {} as unknown as ExperienceItem
      spyOn(experienceItemAdapter, 'adapt').and.returnValue(fakeExperienceItem)

      const experienceItems = sut.getExperienceItems()

      expect(experienceItemAdapter.adapt).toHaveBeenCalledTimes(
        someResumeWorkItems.length,
      )
      // noinspection JSVoidFunctionReturnValueUsed
      expect(experienceItems).toEqual(
        // eslint-disable-next-line prefer-spread
        Array.apply(null, Array(someResumeWorkItems.length)).map(
          () => fakeExperienceItem,
        ),
      )
    })
  })
})
