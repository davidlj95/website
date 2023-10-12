import { TestBed } from '@angular/core/testing'
import resume from '../../../../assets/resume.json'

import {
  JsonResumeExperienceItemAdapterService,
  JsonResumeWorkItem,
} from './json-resume-experience-item-adapter.service'
import { Environment } from '../../../environments'
import { MockProvider } from 'ng-mocks'
import { ENVIRONMENT } from '../../common/injection-tokens'

describe('JsonResumeExperienceItemAdapterService', () => {
  it('should be created', () => {
    TestBed.configureTestingModule({})
    expect(TestBed.inject(JsonResumeExperienceItemAdapterService)).toBeTruthy()
  })

  const sampleJsonResumeWorkItem = resume.work[0]

  describe('#adapt', () => {
    describe('when images mapping is disabled', () => {
      let sut: JsonResumeExperienceItemAdapterService

      beforeEach(() => {
        const fakeEnvironment: Pick<Environment, 'mapJsonResumeImages'> = {
          mapJsonResumeImages: false,
        }
        TestBed.configureTestingModule({
          providers: [MockProvider(ENVIRONMENT, fakeEnvironment)],
        })
        sut = TestBed.inject(JsonResumeExperienceItemAdapterService)
      })

      it('should map the company name, image and website', () => {
        const jsonResumeWorkItem: JsonResumeWorkItem = {
          ...sampleJsonResumeWorkItem,
          name: 'Fake company name',
          url: 'https://example.org/',
          image: 'https://example.org/logo.png',
        }
        const experienceItem = sut.adapt(jsonResumeWorkItem)

        expect(experienceItem.company.name).toEqual(jsonResumeWorkItem.name)
        expect(experienceItem.company.website).toEqual(
          new URL(jsonResumeWorkItem.url),
        )
        expect(experienceItem.company.image).toEqual(
          new URL(jsonResumeWorkItem.image),
        )
      })

      it('should map the role, summary and highlights', () => {
        const highlights = ['Highlight 1', 'Highlight 2']
        const jsonResumeWorkItem: JsonResumeWorkItem = {
          ...sampleJsonResumeWorkItem,
          position: 'Position',
          summary: 'Summary',
          highlights: highlights,
        } as JsonResumeWorkItem
        const experienceItem = sut.adapt(jsonResumeWorkItem)

        expect(experienceItem.role).toEqual(jsonResumeWorkItem.position)
        expect(experienceItem.summary).toEqual(jsonResumeWorkItem.summary)
        expect(experienceItem.highlights).toEqual(highlights)
      })
      it('should map the date range', () => {
        const startDate = '2022-12-31'
        const endDate = '2024-01-01'
        const jsonResumeWorkItem: JsonResumeWorkItem = {
          ...sampleJsonResumeWorkItem,
          startDate: startDate,
          endDate: endDate,
        }
        const experienceItem = sut.adapt(jsonResumeWorkItem)

        expect(experienceItem.dateRange.start).toEqual(new Date(startDate))
        expect(experienceItem.dateRange.end).toEqual(new Date(endDate))
      })
      describe('when no end date', () => {
        it('should map no end date exists too', () => {
          const jsonResumeWorkItem: JsonResumeWorkItem = {
            ...sampleJsonResumeWorkItem,
            endDate: undefined,
          } as unknown as JsonResumeWorkItem
          const experienceItem = sut.adapt(jsonResumeWorkItem)

          expect(experienceItem.dateRange.end).toBeUndefined()
        })
      })

      // Non JSON Resume standard!
      it('should map the freelance, internship, promotions and otherRoles fields', () => {
        const jsonResumeWorkItem: JsonResumeWorkItem = {
          ...sampleJsonResumeWorkItem,
          freelance: true,
          internship: true,
          promotions: true,
          otherRoles: true,
        } as unknown as JsonResumeWorkItem
        const experienceItem = sut.adapt(jsonResumeWorkItem)

        expect(experienceItem.freelance).toBeTrue()
        expect(experienceItem.internship).toBeTrue()
        expect(experienceItem.promotions).toBeTrue()
        expect(experienceItem.otherRoles).toBeTrue()
      })
    })
    describe('when images mapping is enabled', () => {
      const canonicalUrl = new URL('https://example.org/canonical/')
      let sut: JsonResumeExperienceItemAdapterService

      beforeEach(() => {
        const environment: Pick<
          Environment,
          'canonicalUrl' | 'mapJsonResumeImages'
        > = {
          canonicalUrl,
          mapJsonResumeImages: true,
        }
        TestBed.configureTestingModule({
          providers: [MockProvider(ENVIRONMENT, environment)],
        })
        sut = TestBed.inject(JsonResumeExperienceItemAdapterService)
      })

      it('should map the company image into a custom URL using canonical URL, assets path and slug from name', () => {
        const jsonResumeWorkItem: JsonResumeWorkItem = {
          ...sampleJsonResumeWorkItem,
          name: 'Còmpány Näme',
        }
        const expectedImageFileName = 'company-name'
        const experienceItem = sut.adapt(jsonResumeWorkItem)

        expect(experienceItem.company.image.toString()).toEqual(
          canonicalUrl.toString() +
            sut.COMPANIES_IMAGE_ASSETS_PATH +
            expectedImageFileName +
            sut.IMAGE_EXTENSION,
        )
      })
    })
  })
})
