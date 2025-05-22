import { GET_JSON_RESUME_EXPERIENCES } from './get-json-resume-experiences'
import {
  RELATIVIZE_PRODUCTION_URL,
  RelativizeProductionUrl,
} from '@/common/relativize-production-url'
import { serviceTestSetup } from '@/test/helpers/service-test-setup'
import { MockProvider } from 'ng-mocks'
import { makeJsonResumeWorkItem } from './__tests__/make-json-resume-work-item'
import {
  JsonResumeProjects,
  JsonResumeWork,
} from '../json-resume/json-resume-types'
import { JsonResumeService } from '../json-resume/json-resume.service'
import { lastValueFrom, of } from 'rxjs'
import { GET_JSON_RESUME_PROJECTS } from '../projects/get-json-resume-projects'
import { makeJsonResumeProject } from '../projects/__tests__/make-json-resume-project'

describe('GetJsonResumeExperiences', () => {
  it('should be created', () => {
    expect(makeSut()).toBeTruthy()
  })

  it('should map the company name and website', async () => {
    const name = 'Cool company name'
    const url = 'https://example.org/'

    const experience = await callSutAndGetFirstItem({
      jsonResumeWork: [makeJsonResumeWorkItem({ name, url })],
    })

    expect(experience.company.name).toEqual(name)
    expect(experience.company.website).toEqual(new URL(url))
  })

  it('should map the position, summary and highlights', async () => {
    const highlights = ['Highlight 1', 'Highlight 2']
    const position = 'Position'
    const summary = 'Summary'

    const experience = await callSutAndGetFirstItem({
      jsonResumeWork: [
        makeJsonResumeWorkItem({ highlights, position, summary }),
      ],
    })

    expect(experience.position).toEqual(position)
    expect(experience.summary).toEqual(summary)
    expect(experience.highlights).toEqual(highlights)
  })

  it('should map the date range', async () => {
    const startDate = '2022-12-31'
    const endDate = '2024-01-01'

    const experience = await callSutAndGetFirstItem({
      jsonResumeWork: [makeJsonResumeWorkItem({ startDate, endDate })],
    })

    expect(experience.dateRange.start).toEqual(new Date(startDate))
    expect(experience.dateRange.end).toEqual(new Date(endDate))
  })

  it('should map projects technologies with its projects names', async () => {
    const technologies = ['Tech 1', 'Tech 2']
    const name = 'ACME'
    const aProject = makeJsonResumeProject({
      name: 'project 1',
      entity: name,
      technologies,
    })
    const anotherProject = makeJsonResumeProject({
      name: 'project 2',
      entity: name,
      technologies,
    })

    const experience = await callSutAndGetFirstItem({
      jsonResumeWork: [makeJsonResumeWorkItem({ name })],
      jsonResumeProjects: [aProject, anotherProject],
    })

    expect(experience.relatedProjects).toEqual([
      aProject.name,
      anotherProject.name,
    ])

    expect(experience.technologies).toEqual(technologies)
  })

  // Non JSON Resume standard!
  it('should relativize image URL', async () => {
    const dummyImagePath = '/images/companies/foo.png'
    const image = `https://example.com${dummyImagePath}`
    const relativizeProductionUrl = jasmine
      .createSpy<RelativizeProductionUrl>()
      .and.returnValue(dummyImagePath)

    const experience = await callSutAndGetFirstItem({
      jsonResumeWork: [makeJsonResumeWorkItem({ image })],
      relativizeProductionUrl,
    })

    expect(experience.company.imageSrc).toEqual(dummyImagePath)
    expect(relativizeProductionUrl).toHaveBeenCalledOnceWith(new URL(image))
  })
})

const makeSut = ({
  jsonResumeWork,
  relativizeProductionUrl,
  jsonResumeProjects,
}: {
  jsonResumeWork?: JsonResumeWork
  relativizeProductionUrl?: RelativizeProductionUrl
  jsonResumeProjects?: JsonResumeProjects
} = {}) =>
  serviceTestSetup(GET_JSON_RESUME_EXPERIENCES, {
    providers: [
      MockProvider(JsonResumeService, {
        getWork: () => of(jsonResumeWork ?? []),
      }),
      MockProvider(
        RELATIVIZE_PRODUCTION_URL,
        relativizeProductionUrl ?? (() => '/fake/path'),
      ),
      MockProvider(GET_JSON_RESUME_PROJECTS, () =>
        of(jsonResumeProjects ?? []),
      ),
    ],
  })

const callSutAndGetFirstItem = async (
  opts: Parameters<typeof makeSut>[0] = {},
) => (await lastValueFrom(makeSut(opts)()))[0]
