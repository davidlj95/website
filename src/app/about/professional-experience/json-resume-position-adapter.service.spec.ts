import { TestBed } from '@angular/core/testing'
import resume from '../../../../assets/resume.json'

import {
  JsonResumePositionAdapterService,
  JsonResumeWorkPosition,
} from './json-resume-position-adapter.service'
import { Environment } from '../../../environments'
import { MockProvider } from 'ng-mocks'
import { ENVIRONMENT } from '../../common/injection-tokens'

describe('JsonResumePositionAdapterService', () => {
  it('should be created', () => {
    TestBed.configureTestingModule({})
    expect(TestBed.inject(JsonResumePositionAdapterService)).toBeTruthy()
  })

  const sampleJsonResumeWorkPosition = resume.work[0]

  describe('#adapt', () => {
    describe('when images mapping is disabled', () => {
      let sut: JsonResumePositionAdapterService

      beforeEach(() => {
        const fakeEnvironment: Pick<Environment, 'mapJsonResumeImages'> = {
          mapJsonResumeImages: false,
        }
        TestBed.configureTestingModule({
          providers: [MockProvider(ENVIRONMENT, fakeEnvironment)],
        })
        sut = TestBed.inject(JsonResumePositionAdapterService)
      })

      it('should map the company name, image and website', () => {
        const fakeJsonResumePosition: JsonResumeWorkPosition = {
          ...sampleJsonResumeWorkPosition,
          name: 'Fake company name',
          url: 'https://example.org/',
          image: 'https://example.org/logo.png',
        }
        const position = sut.adapt(
          fakeJsonResumePosition as JsonResumeWorkPosition,
        )

        expect(position.company.name).toEqual(fakeJsonResumePosition.name)
        expect(position.company.website.toString()).toEqual(
          fakeJsonResumePosition.url,
        )
        expect(position.company.image.toString()).toEqual(
          fakeJsonResumePosition.image,
        )
      })

      it('should map the role, summary and highlights', () => {
        const fakeHighlights = ['Fake highlight 1', 'Fake highlight 2']
        const fakeJsonResumePosition: JsonResumeWorkPosition = {
          ...sampleJsonResumeWorkPosition,
          position: 'Fake position',
          summary: 'Foo bar',
          highlights: fakeHighlights,
        } as JsonResumeWorkPosition
        const position = sut.adapt(
          fakeJsonResumePosition as JsonResumeWorkPosition,
        )

        expect(position.role).toEqual(fakeJsonResumePosition.position)
        expect(position.summary).toEqual(fakeJsonResumePosition.summary)
        expect(position.highlights).toEqual(fakeHighlights)
      })
      it('should map the start and end date', () => {
        const fakeStartDate = '2022-12-31'
        const fakeEndDate = '2024-01-01'
        const fakeJsonResumePosition: JsonResumeWorkPosition = {
          ...sampleJsonResumeWorkPosition,
          startDate: fakeStartDate,
          endDate: fakeEndDate,
        } as JsonResumeWorkPosition
        const position = sut.adapt(
          fakeJsonResumePosition as JsonResumeWorkPosition,
        )

        expect(position.startDate).toEqual(new Date(fakeStartDate))
        expect(position.endDate).toEqual(new Date(fakeEndDate))
      })
      describe('when no end date', () => {
        it('should map no end date exists too', () => {
          const fakeJsonResumePosition: JsonResumeWorkPosition = {
            ...sampleJsonResumeWorkPosition,
            endDate: undefined,
          } as unknown as JsonResumeWorkPosition
          const position = sut.adapt(
            fakeJsonResumePosition as JsonResumeWorkPosition,
          )

          expect(position.endDate).toBeUndefined()
        })
      })
      // Non JSON Resume standard!

      it('should map the freelance, internship, promotions and otherRoles fields', () => {
        const fakePromotions = true
        const fakeOtherRoles = true
        const fakeJsonResumePosition: JsonResumeWorkPosition = {
          ...sampleJsonResumeWorkPosition,
          freelance: true,
          internship: true,
          promotions: fakePromotions,
          otherRoles: fakeOtherRoles,
        } as unknown as JsonResumeWorkPosition
        const position = sut.adapt(
          fakeJsonResumePosition as JsonResumeWorkPosition,
        )

        expect(position.freelance).toBeTrue()
        expect(position.internship).toBeTrue()
        expect(position.promotions).toEqual(fakePromotions)
        expect(position.otherRoles).toEqual(fakeOtherRoles)
      })
    })
    describe('when images mapping is enabled', () => {
      const fakeCanonicalUrl = new URL('https://example.org/canonical/')
      let sut: JsonResumePositionAdapterService

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
        sut = TestBed.inject(JsonResumePositionAdapterService)
      })

      it('should map the company image into a custom URL using canonical URL, assets path and slug from name', () => {
        const fakeJsonResumePosition: JsonResumeWorkPosition = {
          ...sampleJsonResumeWorkPosition,
          name: 'Fake còmpány  Name',
        }
        const expectedImageFileName = 'fake-company-name'
        const position = sut.adapt(
          fakeJsonResumePosition as JsonResumeWorkPosition,
        )

        expect(position.company.image.toString()).toEqual(
          fakeCanonicalUrl.toString() +
            sut.COMPANIES_IMAGE_ASSETS_PATH +
            expectedImageFileName +
            sut.IMAGE_EXTENSION,
        )
      })
    })
  })
})
