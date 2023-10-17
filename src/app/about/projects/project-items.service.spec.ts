import { TestBed } from '@angular/core/testing'

import {
  JSON_RESUME_PROJECTS,
  JsonResumeProjects,
  ProjectItemsService,
} from './project-items.service'
import { MockProvider } from 'ng-mocks'
import {
  JsonResumeProjectItem,
  JsonResumeProjectItemAdapterService,
} from './json-resume-project-item-adapter.service'
import { ProjectItem } from './project-item/project-item'

describe('ProjectItemsService', () => {
  it('should be created', () => {
    expect(makeSut()).toBeTruthy()
  })

  describe('#get', () => {
    it('should return adapted items from JSON Resume', () => {
      const jsonResumeProject1 = 'item-1' as unknown as JsonResumeProjectItem
      const jsonResumeProject2 = 'item-2' as unknown as JsonResumeProjectItem
      const jsonResumeProjects = [jsonResumeProject1, jsonResumeProject2]
      const expectedProjectItems =
        jsonResumeProjects as unknown as ReadonlyArray<ProjectItem>
      const sut = makeSut(jsonResumeProjects)
      const adapter = TestBed.inject(JsonResumeProjectItemAdapterService)
      spyOn(adapter, 'adapt').and.returnValues(...expectedProjectItems)

      const items = sut.get()

      expect(items).toEqual(expectedProjectItems)
      expect(adapter.adapt).toHaveBeenCalledTimes(jsonResumeProjects.length)
    })
  })
})

function makeSut(jsonResumeProjects?: JsonResumeProjects): ProjectItemsService {
  const providers = []
  if (jsonResumeProjects) {
    providers.push(MockProvider(JSON_RESUME_PROJECTS, jsonResumeProjects))
  }
  TestBed.configureTestingModule({ providers })
  return TestBed.inject(ProjectItemsService)
}
