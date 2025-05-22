import {
  GET_JSON_RESUME_PROJECTS,
  GetJsonResumeProjects,
} from './get-json-resume-projects'
import { MockProvider } from 'ng-mocks'
import { serviceTestSetup } from '@/test/helpers/service-test-setup'
import {
  RELATIVIZE_PRODUCTION_URL,
  RelativizeProductionUrl,
} from '@/common/relativize-production-url'
import { makeJsonResumeProject } from './__tests__/make-json-resume-project'
import { lastValueFrom, of } from 'rxjs'
import { JsonResumeProjects } from '../json-resume/json-resume-types'
import { JsonResumeService } from '../json-resume/json-resume.service'

describe('GetJsonResumeProjects', () => {
  it('should be created', () => {
    expect(makeSut()).toBeTruthy()
  })

  it('should map name, description, entity and roles', async () => {
    const name = 'Super cool project'
    const description = 'Does magic things'
    const entity = 'entity'
    const roles = ['Role A', 'Role B']
    const technologies = ['Tech A', 'Tech B']

    const project = await callSutAndGetFirstItem({
      jsonResumeProjects: [
        makeJsonResumeProject({
          name,
          description,
          entity,
          roles,
          technologies,
        }),
      ],
    })

    expect(project.name).toEqual(name)
    expect(project.description).toEqual(description)
    expect(project.entity).toEqual(entity)
    expect(project.roles).toEqual(roles)
    expect(project.technologies).toEqual(technologies)
  })

  it('should map start date', async () => {
    const startDate = '2022-12-31'
    const project = await callSutAndGetFirstItem({
      jsonResumeProjects: [makeJsonResumeProject({ startDate })],
    })

    expect(project.dateRange.start).toEqual(new Date(startDate))
  })

  it('should map end date', async () => {
    const endDate = '2023-12-31'
    const project = await callSutAndGetFirstItem({
      jsonResumeProjects: [makeJsonResumeProject({ endDate })],
    })

    expect(project.dateRange.end).toEqual(new Date(endDate))
  })

  it('should map no end date if no end date is given', async () => {
    const endDate = undefined
    const project = await callSutAndGetFirstItem({
      jsonResumeProjects: [makeJsonResumeProject({ endDate })],
    })

    expect(project.dateRange.end).toBeUndefined()
  })

  it('should map website when exists', async () => {
    const url = 'https://example.org/website'

    const project = await callSutAndGetFirstItem({
      jsonResumeProjects: [makeJsonResumeProject({ url })],
    })

    expect(project.website).toEqual(new URL(url))
  })

  it('should map no website when does not exist', async () => {
    const url = undefined

    const project = await callSutAndGetFirstItem({
      jsonResumeProjects: [makeJsonResumeProject({ url })],
    })

    expect(project.website).toBeUndefined()
  })

  it('should relativize image URL when image exists', async () => {
    const dummyImagePath = '/images/projects/foo.png'
    const image = `https://example.com${dummyImagePath}`
    const relativizeProductionUrl = jasmine
      .createSpy<RelativizeProductionUrl>()
      .and.returnValue(dummyImagePath)

    const item = await callSutAndGetFirstItem({
      jsonResumeProjects: [makeJsonResumeProject({ image })],
      relativizeProductionUrl,
    })

    expect(item.imageSrc).toEqual(dummyImagePath)
    expect(relativizeProductionUrl).toHaveBeenCalledOnceWith(new URL(image))
  })

  it('should map no image when not given', async () => {
    const image = undefined
    const relativizeProductionUrl = jasmine.createSpy<RelativizeProductionUrl>()

    const item = await callSutAndGetFirstItem({
      jsonResumeProjects: [makeJsonResumeProject({ image })],
      relativizeProductionUrl,
    })

    expect(item.imageSrc).toBeUndefined()
    expect(relativizeProductionUrl).not.toHaveBeenCalled()
  })
})

const makeSut = ({
  jsonResumeProjects,
  relativizeProductionUrl,
}: {
  jsonResumeProjects?: JsonResumeProjects
  relativizeProductionUrl?: RelativizeProductionUrl
} = {}): GetJsonResumeProjects =>
  serviceTestSetup(GET_JSON_RESUME_PROJECTS, {
    providers: [
      MockProvider(JsonResumeService, {
        getProjects: () => of(jsonResumeProjects ?? []),
      }),
      MockProvider(
        RELATIVIZE_PRODUCTION_URL,
        relativizeProductionUrl ?? (() => '/fake/path'),
      ),
    ],
  })

const callSutAndGetFirstItem = async (
  opts: Parameters<typeof makeSut>[0] = {},
) => (await lastValueFrom(makeSut(opts)()))[0]
