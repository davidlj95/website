import resume from '@/data/resume.json'

import {
  ADAPT_JSON_RESUME_WORK,
  AdaptJsonResumeWork,
  JsonResumeWork,
} from './adapt-json-resume-work'
import {
  RELATIVIZE_PRODUCTION_URL,
  RelativizeProductionUrl,
} from '@/common/relativize-production-url'
import { serviceTestSetup } from '@/test/helpers/service-test-setup'
import { MockProvider } from 'ng-mocks'
import { makeJsonResumeProject } from '../projects-section/__tests__/make-json-resume-project'
import {
  ADAPT_JSON_RESUME_PROJECT,
  AdaptJsonResumeProject,
} from '../projects-section/adapt-json-resume-project'
import { makeProjectItem } from '../projects-section/__tests__/make-project-item'
import {
  JSON_RESUME_PROJECTS,
  JsonResumeProjects,
} from '../projects-section/json-resume-projects'

describe('AdaptJsonResumeWork', () => {
  it('should be created', () => {
    expect(makeSut()).toBeTruthy()
  })

  it('should map the company name and website', () => {
    const name = 'Cool company name'
    const url = 'https://example.org/'

    const item = makeSut()(makeJsonResumeWork({ name, url }))

    expect(item.company.name).toEqual(name)
    expect(item.company.website).toEqual(new URL(url))
  })

  it('should map the position, summary and highlights', () => {
    const highlights = ['Highlight 1', 'Highlight 2']
    const position = 'Position'
    const summary = 'Summary'

    const item = makeSut()(
      makeJsonResumeWork({ highlights, position, summary }),
    )

    expect(item.position).toEqual(position)
    expect(item.summary).toEqual(summary)
    expect(item.highlights).toEqual(highlights)
  })

  it('should map the date range', () => {
    const startDate = '2022-12-31'
    const endDate = '2024-01-01'

    const item = makeSut()(makeJsonResumeWork({ startDate, endDate }))

    expect(item.dateRange.start).toEqual(new Date(startDate))
    expect(item.dateRange.end).toEqual(new Date(endDate))
  })

  describe('when no end date', () => {
    it('should map no end date exists too', () => {
      const endDate = undefined

      const item = makeSut()(makeJsonResumeWork({ endDate }))

      expect(item.dateRange.end).toBeUndefined()
    })
  })

  // Non JSON Resume standard!
  it('should map tags', () => {
    const tags = ['freelance', 'promotions']

    const item = makeSut()(
      makeJsonResumeWork({
        tags,
      } as unknown as Partial<JsonResumeWork>),
    )

    expect(item.tags).toEqual(tags)
  })

  it('should add employee tag if no freelance tag is found', () => {
    const tags = ['foo']

    const item = makeSut()(
      makeJsonResumeWork({
        tags,
      } as unknown as Partial<JsonResumeWork>),
    )

    expect(item.tags).toEqual([...tags, 'employee'])
  })

  it('should map the freelance, internship, promotions and more positions fields', () => {
    const isFreelance = true
    const isInternship = true
    const hasPromotions = true
    const hasMorePositions = true

    const item = makeSut()(
      makeJsonResumeWork({
        isFreelance,
        isInternship,
        hasPromotions,
        hasMorePositions,
      } as unknown as Partial<JsonResumeWork>),
    )

    expect(item.isFreelance).toBe(isFreelance)
    expect(item.isInternship).toBe(isInternship)
    expect(item.hasPromotions).toBe(hasPromotions)
    expect(item.hasMorePositions).toBe(hasMorePositions)
  })

  it('should relativize image URL', () => {
    const dummyImagePath = '/images/companies/foo.png'
    const image = `https://example.com${dummyImagePath}`
    const relativizeProductionUrl = jasmine
      .createSpy<RelativizeProductionUrl>()
      .and.returnValue(dummyImagePath)
    const sut = makeSut({ relativizeProductionUrl })

    const item = sut(makeJsonResumeWork({ image }))

    expect(relativizeProductionUrl).toHaveBeenCalledOnceWith(new URL(image))
    expect(item.company.imageSrc).toEqual(dummyImagePath)
  })

  it('should add projects whose entity matches company name', () => {
    const companyName = 'ACME Intl.'
    const project = makeJsonResumeProject({ entity: companyName })
    const projectItem = makeProjectItem({ name: project.name })
    const adaptJsonResumeProject = jasmine
      .createSpy<AdaptJsonResumeProject>()
      .and.returnValue(projectItem)
    const jsonResumeProjects = [project]
    const sut = makeSut({ adaptJsonResumeProject, jsonResumeProjects })

    const item = sut(makeJsonResumeWork({ name: companyName }))

    expect(item.projects).toEqual([projectItem])
    expect(adaptJsonResumeProject).toHaveBeenCalledOnceWith(project)
  })
})

const makeSut = (
  opts: {
    relativizeProductionUrl?: RelativizeProductionUrl
    adaptJsonResumeProject?: AdaptJsonResumeProject
    jsonResumeProjects?: JsonResumeProjects
  } = {},
): AdaptJsonResumeWork =>
  serviceTestSetup(ADAPT_JSON_RESUME_WORK, {
    providers: [
      MockProvider(
        RELATIVIZE_PRODUCTION_URL,
        opts.relativizeProductionUrl ?? (() => '/fake/path'),
      ),
      MockProvider(
        ADAPT_JSON_RESUME_PROJECT,
        opts.adaptJsonResumeProject ??
          // eslint-disable-next-line jasmine/no-unsafe-spy
          jasmine.createSpy<AdaptJsonResumeProject>(),
      ),
      MockProvider(JSON_RESUME_PROJECTS, opts.jsonResumeProjects ?? []),
    ],
  })

const sampleJsonResumeWork = resume.work[0]

function makeJsonResumeWork(
  overrides?: Partial<JsonResumeWork>,
): JsonResumeWork {
  return {
    ...sampleJsonResumeWork,
    ...overrides,
  } as JsonResumeWork
}
