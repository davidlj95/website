import { PROJECT_SERVICE } from './project-service'
import { MockProvider } from 'ng-mocks'
import { serviceTestSetup } from '@/test/helpers/service-test-setup'
import { firstValueFrom, of } from 'rxjs'
import { makeProject } from './__tests__/make-project'
import {
  GET_JSON_RESUME_PROJECTS,
  GetJsonResumeProjects,
} from './get-json-resume-projects'

describe('ProjectService', () => {
  it('should be created', () => {
    expect(makeSut()).toBeTruthy()
  })

  it('should return JSON Resume projects', async () => {
    const projects = [makeProject(), makeProject()]

    const getJsonResumeProjects = jasmine
      .createSpy<GetJsonResumeProjects>()
      .and.returnValue(of(projects))

    const sut = makeSut({ getJsonResumeProjects })

    const actual = await firstValueFrom(sut.getAll())

    expect(actual).toEqual(actual)
    expect(getJsonResumeProjects).toHaveBeenCalledOnceWith()
  })
})

const makeSut = ({
  getJsonResumeProjects,
}: {
  getJsonResumeProjects?: GetJsonResumeProjects
} = {}) =>
  serviceTestSetup(PROJECT_SERVICE, {
    providers: [
      MockProvider(
        GET_JSON_RESUME_PROJECTS,
        getJsonResumeProjects ??
          // eslint-disable-next-line jasmine/no-unsafe-spy
          jasmine.createSpy<GetJsonResumeProjects>().and.returnValue(of([])),
      ),
    ],
  })
