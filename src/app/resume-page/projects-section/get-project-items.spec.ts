import { GET_PROJECT_ITEMS, GetProjectItems } from './get-project-items'
import { MockProvider } from 'ng-mocks'
import {
  ADAPT_JSON_RESUME_PROJECT,
  AdaptJsonResumeProject,
} from '../data/adapt-json-resume-project'
import { Project } from '../data/project'
import { serviceTestSetup } from '@/test/helpers/service-test-setup'
import { JSON_RESUME_PROJECTS } from './json-resume-projects'
import { JsonResumeProject, JsonResumeProjects } from '../json-resume/types'

describe('GetProjectItems', () => {
  it('should be created', () => {
    expect(makeSut()).toBeTruthy()
  })

  it('should return adapted items from JSON Resume', () => {
    const jsonResumeProjects = [
      'item-1' as unknown as JsonResumeProject,
      'item-2' as unknown as JsonResumeProject,
    ]
    const expectedProjectItems =
      jsonResumeProjects as unknown as readonly Project[]
    const adaptJsonResumeProject = jasmine
      .createSpy<AdaptJsonResumeProject>()
      .and.returnValues(...expectedProjectItems)
    const sut = makeSut({ jsonResumeProjects, adaptJsonResumeProject })

    const items = sut()

    expect(items).toEqual(expectedProjectItems)
    expect(adaptJsonResumeProject).toHaveBeenCalledTimes(
      jsonResumeProjects.length,
    )
  })
})

const makeSut = (
  opts: {
    jsonResumeProjects?: JsonResumeProjects
    adaptJsonResumeProject?: AdaptJsonResumeProject
  } = {},
): GetProjectItems =>
  serviceTestSetup(GET_PROJECT_ITEMS, {
    providers: [
      opts.jsonResumeProjects
        ? MockProvider(JSON_RESUME_PROJECTS, opts.jsonResumeProjects)
        : [],
      opts.adaptJsonResumeProject
        ? MockProvider(ADAPT_JSON_RESUME_PROJECT, opts.adaptJsonResumeProject)
        : [],
    ],
  })
