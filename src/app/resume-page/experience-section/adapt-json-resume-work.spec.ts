import resume from '../../../../assets/resume.json'

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

describe('AdaptJsonResumeWork', () => {
  it('should be created', () => {
    expect(makeSut()).toBeTruthy()
  })

  it('should map the company name and website', () => {
    const name = 'Cool company name'
    const url = 'https://example.org/'

    const item = makeSut()(makeJsonResumeWorkItem({ name, url }))

    expect(item.company.name).toEqual(name)
    expect(item.company.website).toEqual(new URL(url))
  })

  it('should map the position, summary and highlights', () => {
    const highlights = ['Highlight 1', 'Highlight 2']
    const position = 'Position'
    const summary = 'Summary'

    const item = makeSut()(
      makeJsonResumeWorkItem({ highlights, position, summary }),
    )

    expect(item.position).toEqual(position)
    expect(item.summary).toEqual(summary)
    expect(item.highlights).toEqual(highlights)
  })

  it('should map the date range', () => {
    const startDate = '2022-12-31'
    const endDate = '2024-01-01'

    const item = makeSut()(makeJsonResumeWorkItem({ startDate, endDate }))

    expect(item.dateRange.start).toEqual(new Date(startDate))
    expect(item.dateRange.end).toEqual(new Date(endDate))
  })

  describe('when no end date', () => {
    it('should map no end date exists too', () => {
      const endDate = undefined

      const item = makeSut()(makeJsonResumeWorkItem({ endDate }))

      expect(item.dateRange.end).toBeUndefined()
    })
  })

  // Non JSON Resume standard!
  it('should map the freelance, internship, promotions and more positions fields', () => {
    const freelance = true
    const internship = true
    const promotions = true
    const morePositions = true

    const item = makeSut()(
      makeJsonResumeWorkItem({
        freelance,
        internship,
        promotions,
        morePositions,
      } as unknown as Partial<JsonResumeWork>),
    )

    expect(item.freelance).toBe(freelance)
    expect(item.internship).toBe(internship)
    expect(item.promotions).toBe(promotions)
    expect(item.morePositions).toBe(morePositions)
  })

  it('should relativize image URL', () => {
    const dummyImagePath = '/assets/companies/foo.png'
    const image = `https://example.com${dummyImagePath}`
    const relativizeProductionUrl = jasmine
      .createSpy<RelativizeProductionUrl>()
      .and.returnValue(dummyImagePath)
    const sut = makeSut({ relativizeProductionUrl })

    const item = sut(makeJsonResumeWorkItem({ image }))

    expect(relativizeProductionUrl).toHaveBeenCalledOnceWith(new URL(image))
    expect(item.company.imageSrc).toEqual(dummyImagePath)
  })
})

const makeSut = (
  opts: { relativizeProductionUrl?: RelativizeProductionUrl } = {},
): AdaptJsonResumeWork =>
  serviceTestSetup(ADAPT_JSON_RESUME_WORK, {
    providers: [
      MockProvider(
        RELATIVIZE_PRODUCTION_URL,
        opts.relativizeProductionUrl ?? (() => '/fake/path'),
      ),
    ],
  })

const sampleJsonResumeWorkItem = resume.work[0]

function makeJsonResumeWorkItem(
  overrides?: Partial<JsonResumeWork>,
): JsonResumeWork {
  return {
    ...sampleJsonResumeWorkItem,
    ...overrides,
  } as JsonResumeWork
}
