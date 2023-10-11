import { TestBed } from '@angular/core/testing'

import {
  JSON_RESUME_WORK,
  JsonResumeAdapterService,
} from './json-resume-adapter.service'
import resume from '../../../../assets/resume.json'
import { JsonResumePositionAdapterService } from './json-resume-position-adapter.service'
import { Position } from './position/position'
import { MockProvider } from 'ng-mocks'

describe('JsonResumeAdapterService', () => {
  it('should be created', () => {
    TestBed.configureTestingModule({})
    expect(TestBed.inject(JsonResumeAdapterService)).toBeTruthy()
  })

  describe('getPositions', () => {
    const realResumePositions = resume.work
    const someResumePositions = [
      realResumePositions[0],
      realResumePositions[1],
      realResumePositions[2],
    ]
    let sut: JsonResumeAdapterService
    let positionAdapter: JsonResumePositionAdapterService

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [MockProvider(JSON_RESUME_WORK, someResumePositions)],
      })
      positionAdapter = TestBed.inject(JsonResumePositionAdapterService)
      sut = TestBed.inject(JsonResumeAdapterService)
    })

    it('should return as many as in the JSON resume work section', () => {
      expect(sut.getPositions().length).toBe(someResumePositions.length)
    })

    it('should map each item using the position adapter', () => {
      const fakePosition = {} as unknown as Position
      spyOn(positionAdapter, 'adapt').and.returnValue(fakePosition)

      const positions = sut.getPositions()

      expect(positionAdapter.adapt).toHaveBeenCalledTimes(
        someResumePositions.length,
      )
      // noinspection JSVoidFunctionReturnValueUsed
      expect(positions).toEqual(
        // eslint-disable-next-line prefer-spread
        Array.apply(null, Array(someResumePositions.length)).map(
          () => fakePosition,
        ),
      )
    })
  })
})
