import resume from '@/data/resume.json'

import { ADAPT_JSON_RESUME_WORK, EMPLOYEE_TAG } from './adapt-json-resume-work'
import {
  RELATIVIZE_PRODUCTION_URL,
  RelativizeProductionUrl,
} from '@/common/relativize-production-url'
import { serviceTestSetup } from '@/test/helpers/service-test-setup'
import { MockProvider } from 'ng-mocks'
import { JsonResumeWorkItem } from '../json-resume/types'
import { TAG_TO_ATTRIBUTE } from '../attribute'

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
  it('should map tags to attributes', () => {
    const tags = ['freelance', 'promotions']

    const item = makeSut()(makeJsonResumeWorkItem({ tags }))

    expect(item.attributes).toEqual([
      TAG_TO_ATTRIBUTE[tags[0]],
      TAG_TO_ATTRIBUTE[tags[1]],
    ])
  })

  it('should add employee attribute if no freelance tag is found', () => {
    const tags = ['foo']

    const item = makeSut()(
      makeJsonResumeWorkItem({
        tags,
      } as unknown as Partial<JsonResumeWorkItem>),
    )

    expect(item.attributes).toEqual([TAG_TO_ATTRIBUTE[EMPLOYEE_TAG]])
  })

  it('should relativize image URL', () => {
    const dummyImagePath = '/images/companies/foo.png'
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
  opts: {
    relativizeProductionUrl?: RelativizeProductionUrl
  } = {},
) =>
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
  overrides?: Partial<JsonResumeWorkItem>,
): JsonResumeWorkItem {
  return {
    ...sampleJsonResumeWorkItem,
    ...overrides,
  } as JsonResumeWorkItem
}
