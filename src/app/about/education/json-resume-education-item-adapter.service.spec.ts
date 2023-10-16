import { TestBed } from '@angular/core/testing'
import resume from '../../../../assets/resume.json'
import { Environment } from '../../../environments'
import { MockProvider } from 'ng-mocks'
import { ENVIRONMENT } from '../../common/injection-tokens'
import {
  JsonResumeEducationItem,
  JsonResumeEducationItemAdapterService,
} from './json-resume-education-item-adapter.service'

describe('JsonResumeEducationItemAdapterService', () => {
  it('should be created', () => {
    expect(makeSut()).toBeTruthy()
  })

  describe('#adapt', () => {
    it('should map the institution name, website and short name', () => {
      const institution = 'Fake institution name'
      const url = 'https://example.org/'
      const shortName = 'FIN'

      const item = makeSut().adapt(
        makeJsonResumeEducationItem({ institution, url, shortName }),
      )

      expect(item.institution.name).toEqual(institution)
      expect(item.institution.website).toEqual(new URL(url))
      expect(item.institution.shortName).toEqual(shortName)
    })

    it('should map the area, study type and score', () => {
      const area = 'Fake area'
      const studyType = 'Fake study type'
      const score = 'Fake score'

      const item = makeSut().adapt(
        makeJsonResumeEducationItem({ area, studyType, score }),
      )

      expect(item.area).toEqual(area)
      expect(item.studyType).toEqual(studyType)
      expect(item.score).toEqual(score)
    })

    it('should map the date range', () => {
      const startDate = '2022-12-31'
      const endDate = '2024-01-01'

      const item = makeSut().adapt(
        makeJsonResumeEducationItem({ startDate, endDate }),
      )

      expect(item.dateRange.start).toEqual(new Date(startDate))
      expect(item.dateRange.end).toEqual(new Date(endDate))
    })
    describe('when no end date', () => {
      it('should map no end date exists too', () => {
        const endDate = undefined

        const item = makeSut().adapt(makeJsonResumeEducationItem({ endDate }))

        expect(item.dateRange.end).toBeUndefined()
      })
    })

    // Non standard fields
    it('should map the cum laude field', () => {
      const item = makeSut().adapt(
        makeJsonResumeEducationItem({ cumLaude: true }),
      )

      expect(item.cumLaude).toBeTrue()
    })

    describe('when image mapping is disabled', () => {
      it('should map the image', () => {
        const image = 'https://example.org/logo.png'

        const item = makeSut().adapt(makeJsonResumeEducationItem({ image }))

        expect(item.institution.imageSrc).toEqual(image)
      })
    })

    describe('when images mapping is enabled', () => {
      const canonicalUrl = new URL('https://example.org/canonical/')
      let sut: JsonResumeEducationItemAdapterService

      beforeEach(() => {
        sut = makeSut({ mapJsonResumeImages: true, canonicalUrl })
      })

      describe('when short name is available', () => {
        it('should map the company image into a custom URL using canonical URL, assets path and slug from short name', () => {
          const institution = 'Fake ínstìtútión name'
          const shortName = 'FIN'
          const expectedImageFileName = 'fin'

          const item = sut.adapt(
            makeJsonResumeEducationItem({ institution, shortName }),
          )

          expect(item.institution.imageSrc).toEqual(
            canonicalUrl.toString() +
              sut.EDUCATION_IMAGES_PATH +
              expectedImageFileName +
              sut.IMAGE_EXTENSION,
          )
        })
      })
      describe('when short name is not available', () => {
        it('should map the company image into a custom URL using canonical URL, assets path and slug from name', () => {
          const institution = 'Fake ínstìtútión name'
          const shortName = undefined
          const expectedImageFileName = 'fake-institution-name'

          const item = sut.adapt(
            makeJsonResumeEducationItem({ institution, shortName }),
          )

          expect(item.institution.imageSrc).toEqual(
            canonicalUrl.toString() +
              sut.EDUCATION_IMAGES_PATH +
              expectedImageFileName +
              sut.IMAGE_EXTENSION,
          )
        })
      })
    })
  })
})

function makeSut(opts?: {
  mapJsonResumeImages: boolean
  canonicalUrl?: URL
}): JsonResumeEducationItemAdapterService {
  let providers: unknown[] | undefined
  if (opts) {
    const environment: Partial<Environment> = {
      mapJsonResumeImages: opts.mapJsonResumeImages,
      canonicalUrl: opts.canonicalUrl,
    }
    providers = [MockProvider(ENVIRONMENT, environment)]
  }
  TestBed.configureTestingModule({ providers })
  return TestBed.inject(JsonResumeEducationItemAdapterService)
}

const sampleJsonResumeEducationItem = resume.education[0]

function makeJsonResumeEducationItem(
  overrides?: Partial<JsonResumeEducationItem>,
): JsonResumeEducationItem {
  return {
    ...sampleJsonResumeEducationItem,
    ...overrides,
  } as JsonResumeEducationItem
}
