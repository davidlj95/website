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
    let sut: JsonResumePositionAdapterService
    const fakeCanonicalUrl = new URL('https://example.org/canonical/')

    beforeEach(() => {
      const fakeEnvironment: Pick<Environment, 'canonicalUrl'> = {
        canonicalUrl: fakeCanonicalUrl,
      }
      TestBed.configureTestingModule({
        providers: [MockProvider(ENVIRONMENT, fakeEnvironment)],
      })
      sut = TestBed.inject(JsonResumePositionAdapterService)
    })

    it('should map the company name and website', () => {
      const fakeJsonResumePosition: JsonResumeWorkPosition = {
        ...sampleJsonResumeWorkPosition,
        company: 'Fake company name',
        website: 'https://example.org/',
      }
      const position = sut.adapt(
        fakeJsonResumePosition as JsonResumeWorkPosition,
      )

      expect(position.company.name).toEqual(fakeJsonResumePosition.company)
      expect(position.company.website.toString()).toEqual(
        fakeJsonResumePosition.website,
      )
    })
    it('should map the company image into a custom URL using canonical URL, custom assets path and kebab-cased+no special chars name', () => {
      const fakeJsonResumePosition: JsonResumeWorkPosition = {
        ...sampleJsonResumeWorkPosition,
        company: 'Fake còmpány  Name',
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
    it('should map the freelance, internship, promotions, otherRoles and formerly known as fields', () => {
      const fakePromotions = true
      const fakeOtherRoles = true
      const fakeFormerlyKnownAs = 'Fake company legacy Inc'
      const fakeJsonResumePosition: JsonResumeWorkPosition = {
        ...sampleJsonResumeWorkPosition,
        freelance: true,
        internship: true,
        promotions: fakePromotions,
        otherRoles: fakeOtherRoles,
        formerlyKnownAs: fakeFormerlyKnownAs,
      } as unknown as JsonResumeWorkPosition
      const position = sut.adapt(
        fakeJsonResumePosition as JsonResumeWorkPosition,
      )

      expect(position.freelance).toBeTrue()
      expect(position.internship).toBeTrue()
      expect(position.promotions).toEqual(fakePromotions)
      expect(position.otherRoles).toEqual(fakeOtherRoles)
      expect(position.company.formerlyKnownAs).toEqual(fakeFormerlyKnownAs)
    })
  })
})
