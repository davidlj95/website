import { TestBed } from '@angular/core/testing'
import resume from '../../../../assets/resume.json'
import { Environment } from '../../../environments'
import { MockProvider } from 'ng-mocks'
import { ENVIRONMENT } from '@common/injection-tokens'
import {
  JsonResumeEducationItem,
  JsonResumeEducationItemAdapterService,
} from './json-resume-education-item-adapter.service'
import { LocalImageService } from '../local-image.service'

describe('JsonResumeEducationItemAdapterService', () => {
  it('should be created', () => {
    expect(makeSut()).toBeTruthy()
  })

  describe('#adapt', () => {
    it('should map the institution name, website and short name', () => {
      const institution = 'Institution name'
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
      const area = 'Area'
      const studyType = 'Study type'
      const score = 'Score'

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

        const item = makeSut({ mapJsonResumeImages: false }).adapt(
          makeJsonResumeEducationItem({ image }),
        )

        expect(item.institution.imageSrc).toEqual(image)
      })
    })

    describe('when images mapping is enabled', () => {
      const institution = 'Instìtútión Name'
      const image = 'https://example.org/logo.png'
      const fakeImageSrc = 'assets/education/institution.png'
      let sut: JsonResumeEducationItemAdapterService
      let localImageService: LocalImageService

      beforeEach(() => {
        sut = makeSut({ mapJsonResumeImages: true })
        localImageService = TestBed.inject(LocalImageService)
        spyOn(localImageService, 'generatePath').and.returnValue(fakeImageSrc)
      })

      it('should generate local image path using service giving proper assets subdirectory', () => {
        const item = sut.adapt(
          makeJsonResumeEducationItem({ institution, image }),
        )

        expect(item.institution.imageSrc).toEqual(fakeImageSrc)
        expect(localImageService.generatePath).toHaveBeenCalledOnceWith({
          name: jasmine.anything(),
          subdirectory: sut.ASSETS_SUBDIRECTORY,
        })
      })

      describe('when short name is available', () => {
        it('should generate local image path based on short name', () => {
          const shortName = 'FIN'

          sut.adapt(makeJsonResumeEducationItem({ institution, shortName }))

          expect(localImageService.generatePath).toHaveBeenCalledOnceWith({
            name: shortName,
            subdirectory: jasmine.anything(),
          })
        })
      })
      describe('when short name is not available', () => {
        it('should generate local image path based on name', () => {
          const shortName = undefined

          sut.adapt(makeJsonResumeEducationItem({ institution, shortName }))

          expect(localImageService.generatePath).toHaveBeenCalledOnceWith({
            name: institution,
            subdirectory: jasmine.anything(),
          })
        })
      })
    })
  })
})

function makeSut({
  mapJsonResumeImages,
}: Partial<Environment> = {}): JsonResumeEducationItemAdapterService {
  let providers: unknown[] | undefined
  if (mapJsonResumeImages !== undefined) {
    const environment: Partial<Environment> = {
      mapJsonResumeImages,
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
