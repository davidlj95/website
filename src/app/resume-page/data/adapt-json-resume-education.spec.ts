import resume from '@/data/resume.json'
import { MockProvider } from 'ng-mocks'
import {
  ADAPT_JSON_RESUME_EDUCATION,
  AdaptJsonResumeEducation,
  JsonResumeEducation,
} from './adapt-json-resume-education'
import {
  RELATIVIZE_PRODUCTION_URL,
  RelativizeProductionUrl,
} from '@/common/relativize-production-url'
import { serviceTestSetup } from '@/test/helpers/service-test-setup'

describe('AdaptJsonResumeEducation', () => {
  it('should be created', () => {
    expect(makeSut()).toBeTruthy()
  })

  it('should map the institution name, website and short name', () => {
    const institution = 'Institution name'
    const url = 'https://example.org/'
    const shortName = 'FIN'

    const item = makeSut()(
      makeJsonResumeEducation({ institution, url, shortName }),
    )

    expect(item.institution.name).toEqual(institution)
    expect(item.institution.website).toEqual(new URL(url))
    expect(item.institution.shortName).toEqual(shortName)
  })

  it('should map the area, study type and score', () => {
    const area = 'Area'
    const studyType = 'Study type'
    const score = 'Score'

    const item = makeSut()(makeJsonResumeEducation({ area, studyType, score }))

    expect(item.area).toEqual(area)
    expect(item.studyType).toEqual(studyType)
    expect(item.score).toEqual(score)
  })

  it('should map the date range', () => {
    const startDate = '2022-12-31'
    const endDate = '2024-01-01'

    const item = makeSut()(makeJsonResumeEducation({ startDate, endDate }))

    expect(item.dateRange.start).toEqual(new Date(startDate))
    expect(item.dateRange.end).toEqual(new Date(endDate))
  })

  describe('when no end date', () => {
    it('should map no end date exists too', () => {
      const endDate = undefined

      const item = makeSut()(makeJsonResumeEducation({ endDate }))

      expect(item.dateRange.end).toBeUndefined()
    })
  })

  // Non standard fields
  it('should map the cum laude field', () => {
    const item = makeSut()(makeJsonResumeEducation({ isCumLaude: true }))

    expect(item.isCumLaude).toBeTrue()
  })

  it('should relativize image URL', () => {
    const dummyImagePath = '/images/education/foo.png'
    const image = `https://example.com${dummyImagePath}`
    const relativizeProductionUrl = jasmine
      .createSpy<RelativizeProductionUrl>()
      .and.returnValue(dummyImagePath)
    const sut = makeSut({ relativizeProductionUrl })

    const item = sut(makeJsonResumeEducation({ image }))

    expect(relativizeProductionUrl).toHaveBeenCalledOnceWith(new URL(image))
    expect(item.institution.imageSrc).toEqual(dummyImagePath)
  })
})

const makeSut = (
  opts: {
    relativizeProductionUrl?: RelativizeProductionUrl
  } = {},
): AdaptJsonResumeEducation =>
  serviceTestSetup(ADAPT_JSON_RESUME_EDUCATION, {
    providers: [
      MockProvider(
        RELATIVIZE_PRODUCTION_URL,
        opts.relativizeProductionUrl ?? (() => '/fake/path'),
      ),
    ],
  })

const sampleJsonResumeEducation = resume.education[0]

function makeJsonResumeEducation(
  overrides?: Partial<JsonResumeEducation>,
): JsonResumeEducation {
  return {
    ...sampleJsonResumeEducation,
    ...overrides,
  } as JsonResumeEducation
}
