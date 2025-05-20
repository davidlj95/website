import { TestBed } from '@angular/core/testing'

import { JsonResumeService } from './json-resume.service'

describe('JsonResumeService', () => {
  let service: JsonResumeService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(JsonResumeService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
