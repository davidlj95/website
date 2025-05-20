import { PROJECT_SERVICE, ProjectService } from './project-service'
import { MockProvider } from 'ng-mocks'
import {
  ADAPT_JSON_RESUME_PROJECT,
  AdaptJsonResumeProject,
} from './adapt-json-resume-project'
import { Project } from './project'
import { serviceTestSetup } from '@/test/helpers/service-test-setup'
import { JsonResumeProject, JsonResumeProjects } from '../json-resume/types'
import { lastValueFrom, of } from 'rxjs'
import { JsonResumeService } from '../json-resume/json-resume.service'

describe('ProjectService', () => {
  it('should be created', () => {
    expect(makeSut()).toBeTruthy()
  })

  it('should return adapted projects from JSON Resume', async () => {
    const projects = [
      'item-1' as unknown as JsonResumeProject,
      'item-2' as unknown as JsonResumeProject,
    ]
    const expectedProjects = projects as unknown as readonly Project[]
    const adaptJsonResumeProject = jasmine
      .createSpy<AdaptJsonResumeProject>()
      .and.returnValues(...expectedProjects)
    const sut = makeSut({ projects, adaptJsonResumeProject })

    const actual = await lastValueFrom(sut.getAll())

    expect(actual).toEqual(expectedProjects)
    expect(adaptJsonResumeProject).toHaveBeenCalledTimes(projects.length)
  })
})

const makeSut = ({
  projects,
  adaptJsonResumeProject,
}: {
  projects?: JsonResumeProjects
  adaptJsonResumeProject?: AdaptJsonResumeProject
} = {}): ProjectService =>
  serviceTestSetup(PROJECT_SERVICE, {
    providers: [
      projects
        ? MockProvider(JsonResumeService, { getProjects: () => of(projects) })
        : [],
      adaptJsonResumeProject
        ? MockProvider(ADAPT_JSON_RESUME_PROJECT, adaptJsonResumeProject)
        : [],
    ],
  })
