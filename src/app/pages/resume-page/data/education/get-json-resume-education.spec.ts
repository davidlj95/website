import { MockProvider } from 'ng-mocks'
import {
  GET_JSON_RESUME_EDUCATION,
  GetJsonResumeEducation,
} from './get-json-resume-education'
import {
  RELATIVIZE_PRODUCTION_URL,
  RelativizeProductionUrl,
} from '@/common/relativize-production-url'
import { serviceTestSetup } from '@/test/helpers/service-test-setup'
import { makeJsonResumeEducationItem } from './__tests__/make-json-resume-education-item'
import { lastValueFrom, of } from 'rxjs'
import { JsonResumeService } from '../json-resume/json-resume.service'
import { JsonResumeEducation } from '../json-resume/json-resume-types'

describe('GetJsonResumeEducation', () => {
  it('should be created', () => {
    expect(makeSut()).toBeTruthy()
  })

  it('should map the institution name, website and short name', async () => {
    const institution = 'Institution name'
    const url = 'https://example.org/'
    const shortName = 'FIN'

    const education = await callSutAndGetFirstItem({
      jsonResumeEducation: [
        makeJsonResumeEducationItem({ institution, url, shortName }),
      ],
    })

    expect(education.institution.name).toEqual(institution)
    expect(education.institution.website).toEqual(new URL(url))
    expect(education.institution.shortName).toEqual(shortName)
  })

  it('should map the area, study type and score', async () => {
    const area = 'Area'
    const studyType = 'Study type'
    const score = 'Score'

    const education = await callSutAndGetFirstItem({
      jsonResumeEducation: [
        makeJsonResumeEducationItem({ area, studyType, score }),
      ],
    })

    expect(education.area).toEqual(area)
    expect(education.studyType).toEqual(studyType)
    expect(education.score).toEqual(score)
  })

  it('should map the date range', async () => {
    const startDate = '2022-12-31'
    const endDate = '2024-01-01'

    const education = await callSutAndGetFirstItem({
      jsonResumeEducation: [
        makeJsonResumeEducationItem({ startDate, endDate }),
      ],
    })

    expect(education.dateRange.start).toEqual(new Date(startDate))
    expect(education.dateRange.end).toEqual(new Date(endDate))
  })

  it('should map no end date when not given', async () => {
    const endDate = undefined

    const education = await callSutAndGetFirstItem({
      jsonResumeEducation: [makeJsonResumeEducationItem({ endDate })],
    })

    expect(education.dateRange.end).toBeUndefined()
  })

  // Non standard fields
  it('should relativize image URL', async () => {
    const dummyImagePath = '/images/education/foo.png'
    const image = `https://example.com${dummyImagePath}`
    const relativizeProductionUrl = jasmine
      .createSpy<RelativizeProductionUrl>()
      .and.returnValue(dummyImagePath)

    const education = await callSutAndGetFirstItem({
      jsonResumeEducation: [makeJsonResumeEducationItem({ image })],
      relativizeProductionUrl,
    })

    expect(education.institution.imageSrc).toEqual(dummyImagePath)
    expect(relativizeProductionUrl).toHaveBeenCalledOnceWith(new URL(image))
  })
})

const makeSut = ({
  jsonResumeEducation,
  relativizeProductionUrl,
}: {
  jsonResumeEducation?: JsonResumeEducation
  relativizeProductionUrl?: RelativizeProductionUrl
} = {}): GetJsonResumeEducation =>
  serviceTestSetup(GET_JSON_RESUME_EDUCATION, {
    providers: [
      MockProvider(JsonResumeService, {
        getEducation: () => of(jsonResumeEducation ?? []),
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
