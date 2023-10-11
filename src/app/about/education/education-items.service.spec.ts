import { TestBed } from '@angular/core/testing'

import {
  EducationItemsService,
  JSON_RESUME_EDUCATION,
} from './education-items.service'
import resume from '../../../../assets/resume.json'
import { MockProvider } from 'ng-mocks'
import { JsonResumeEducationItemAdapterService } from './json-resume-education-item-adapter.service'
import { EducationItem } from './education-item/education-item'

describe('EducationItemsService', () => {
  it('should be created', () => {
    TestBed.configureTestingModule({})
    expect(TestBed.inject(EducationItemsService)).toBeTruthy()
  })

  describe('getEducationItems', () => {
    const realResumeEducationItems = resume.education
    const someResumeEducationItems = [
      realResumeEducationItems[0],
      realResumeEducationItems[1],
    ]
    let sut: EducationItemsService
    let educationItemAdapter: JsonResumeEducationItemAdapterService

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          MockProvider(JSON_RESUME_EDUCATION, someResumeEducationItems),
        ],
      })
      educationItemAdapter = TestBed.inject(
        JsonResumeEducationItemAdapterService,
      )
      sut = TestBed.inject(EducationItemsService)
    })

    it('should return as many as in the JSON resume work section', () => {
      expect(sut.getEducationItems().length).toBe(
        someResumeEducationItems.length,
      )
    })

    it('should map each item using the education item adapter', () => {
      const fakeEducationItem = {} as unknown as EducationItem
      spyOn(educationItemAdapter, 'adapt').and.returnValue(fakeEducationItem)

      const educationItems = sut.getEducationItems()

      expect(educationItemAdapter.adapt).toHaveBeenCalledTimes(
        someResumeEducationItems.length,
      )
      // noinspection JSVoidFunctionReturnValueUsed
      expect(educationItems).toEqual(
        // eslint-disable-next-line prefer-spread
        Array.apply(null, Array(someResumeEducationItems.length)).map(
          () => fakeEducationItem,
        ),
      )
    })
  })
})
