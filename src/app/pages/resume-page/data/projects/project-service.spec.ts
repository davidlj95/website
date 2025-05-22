import { PROJECT_SERVICE } from './project-service'
import { MockProvider } from 'ng-mocks'
import { serviceTestSetup } from '@/test/helpers/service-test-setup'
import { firstValueFrom, of } from 'rxjs'
import { makeProject } from './__tests__/make-project'
import { GET_JSON_RESUME_PROJECTS } from './get-json-resume-projects'
import { Project } from './project'
import { RESUME_CONFIG_SERVICE } from '../resume-config.service'

describe('ProjectService', () => {
  it('should be created', () => {
    expect(makeSut()).toBeTruthy()
  })

  it('should return JSON Resume projects', async () => {
    const projects = [makeProject({ name: 'a' }), makeProject({ name: 'b' })]

    const sut = makeSut({ jsonResumeProjects: projects })

    const actual = await firstValueFrom(sut.getAll())

    expect(actual).toEqual(projects)
  })

  it('should return no projects when compact mode is enabled', async () => {
    const sut = makeSut({
      jsonResumeProjects: [
        makeProject({ name: 'a' }),
        makeProject({ name: 'b' }),
      ],
      isCompact: true,
    })

    const actual = await firstValueFrom(sut.getAll())

    expect(actual).toEqual([])
  })
})

const makeSut = ({
  jsonResumeProjects,
  isCompact,
}: {
  jsonResumeProjects?: readonly Project[]
  isCompact?: boolean
} = {}) =>
  serviceTestSetup(PROJECT_SERVICE, {
    providers: [
      MockProvider(GET_JSON_RESUME_PROJECTS, () =>
        of(jsonResumeProjects ?? []),
      ),
      MockProvider(RESUME_CONFIG_SERVICE, { compact$: of(isCompact ?? false) }),
    ],
  })
