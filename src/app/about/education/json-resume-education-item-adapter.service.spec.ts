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
    TestBed.configureTestingModule({})
    expect(TestBed.inject(JsonResumeEducationItemAdapterService)).toBeTruthy()
  })

  describe('#adapt', () => {
    const sampleJsonResumeEducationItem = resume.education[0]

    describe('when images mapping is disabled', () => {
      let sut: JsonResumeEducationItemAdapterService

      beforeEach(() => {
        const fakeEnvironment: Pick<Environment, 'mapJsonResumeImages'> = {
          mapJsonResumeImages: false,
        }
        TestBed.configureTestingModule({
          providers: [MockProvider(ENVIRONMENT, fakeEnvironment)],
        })
        sut = TestBed.inject(JsonResumeEducationItemAdapterService)
      })

      it('should map the institution name, shortName, image and website', () => {
        const fakeJsonResumeEducationItem: JsonResumeEducationItem = {
          ...sampleJsonResumeEducationItem,
          institution: 'Fake institution name',
          image: 'https://example.org/logo.png',
          url: 'https://example.org/',
          shortName: 'FIN',
        }

        const educationItem = sut.adapt(fakeJsonResumeEducationItem)

        expect(educationItem.institution.name).toEqual(
          fakeJsonResumeEducationItem.institution,
        )
        expect(educationItem.institution.website).toEqual(
          new URL(fakeJsonResumeEducationItem.url),
        )
        expect(educationItem.institution.imageSrc).toEqual(
          fakeJsonResumeEducationItem.image,
        )
        expect(educationItem.institution.shortName).toEqual(
          fakeJsonResumeEducationItem.shortName,
        )
      })

      it('should map the area, study type and score', () => {
        const fakeJsonResumeEducationItem: JsonResumeEducationItem = {
          ...sampleJsonResumeEducationItem,
          area: 'Fake area',
          studyType: 'Fake study type',
          score: 'Fake score',
        } as JsonResumeEducationItem

        const educationItem = sut.adapt(fakeJsonResumeEducationItem)

        expect(educationItem.area).toEqual(fakeJsonResumeEducationItem.area)
        expect(educationItem.studyType).toEqual(
          fakeJsonResumeEducationItem.studyType,
        )
        expect(educationItem.score).toEqual(fakeJsonResumeEducationItem.score)
      })
      it('should map the date range', () => {
        const fakeStartDate = '2022-12-31'
        const fakeEndDate = '2024-01-01'
        const fakeJsonResumeEducationItem: JsonResumeEducationItem = {
          ...sampleJsonResumeEducationItem,
          startDate: fakeStartDate,
          endDate: fakeEndDate,
        } as JsonResumeEducationItem

        const educationItem = sut.adapt(fakeJsonResumeEducationItem)

        expect(educationItem.dateRange.start).toEqual(new Date(fakeStartDate))
        expect(educationItem.dateRange.end).toEqual(new Date(fakeEndDate))
      })
      describe('when no end date', () => {
        it('should map no end date exists too', () => {
          const fakeJsonResumeEducationItem: JsonResumeEducationItem = {
            ...sampleJsonResumeEducationItem,
            endDate: undefined,
          } as unknown as JsonResumeEducationItem

          const educationItem = sut.adapt(fakeJsonResumeEducationItem)

          expect(educationItem.dateRange.end).toBeUndefined()
        })
      })
      // Non standard fields
      it('should map the cum laude field', () => {
        const fakeJsonResumeEducationItem: JsonResumeEducationItem = {
          ...sampleJsonResumeEducationItem,
          cumLaude: true,
        } as JsonResumeEducationItem

        const educationItem = sut.adapt(fakeJsonResumeEducationItem)

        expect(educationItem.cumLaude).toBeTrue()
      })
    })
    describe('when images mapping is enabled', () => {
      const fakeCanonicalUrl = new URL('https://example.org/canonical/')
      let sut: JsonResumeEducationItemAdapterService

      beforeEach(() => {
        const fakeEnvironment: Pick<
          Environment,
          'canonicalUrl' | 'mapJsonResumeImages'
        > = {
          canonicalUrl: fakeCanonicalUrl,
          mapJsonResumeImages: true,
        }
        TestBed.configureTestingModule({
          providers: [MockProvider(ENVIRONMENT, fakeEnvironment)],
        })
        sut = TestBed.inject(JsonResumeEducationItemAdapterService)
      })

      describe('when short name is available', () => {
        it('should map the company image into a custom URL using canonical URL, assets path and slug from short name', () => {
          const fakeJsonResumeEducationItem: JsonResumeEducationItem = {
            ...sampleJsonResumeEducationItem,
            institution: 'Fake ínstìtútión name',
            shortName: 'FIN',
          }
          const expectedImageFileName = 'fin'
          const educationItem = sut.adapt(fakeJsonResumeEducationItem)

          expect(educationItem.institution.imageSrc).toEqual(
            fakeCanonicalUrl.toString() +
              sut.EDUCATION_IMAGES_PATH +
              expectedImageFileName +
              sut.IMAGE_EXTENSION,
          )
        })
      })
      describe('when short name is not available', () => {
        it('should map the company image into a custom URL using canonical URL, assets path and slug from name', () => {
          const fakeJsonResumeEducationItem: JsonResumeEducationItem = {
            ...sampleJsonResumeEducationItem,
            shortName: undefined,
            institution: 'Fake ínstìtútión name',
          } as unknown as JsonResumeEducationItem
          const expectedImageFileName = 'fake-institution-name'
          const educationItem = sut.adapt(fakeJsonResumeEducationItem)

          expect(educationItem.institution.imageSrc).toEqual(
            fakeCanonicalUrl.toString() +
              sut.EDUCATION_IMAGES_PATH +
              expectedImageFileName +
              sut.IMAGE_EXTENSION,
          )
        })
      })
    })
  })
})
