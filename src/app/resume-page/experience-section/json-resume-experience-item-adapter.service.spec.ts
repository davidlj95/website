import { TestBed } from '@angular/core/testing'
import resume from '../../../../assets/resume.json'

import {
  JsonResumeExperienceItemAdapterService,
  JsonResumeWorkItem,
} from './json-resume-experience-item-adapter.service'
import { Environment } from '../../../environments'
import { MockProvider } from 'ng-mocks'
import { ENVIRONMENT } from '@/common/injection-tokens'
import { LocalImageService } from '../local-image.service'

describe('JsonResumeExperienceItemAdapterService', () => {
  it('should be created', () => {
    expect(makeSut()).toBeTruthy()
  })

  describe('#adapt', () => {
    it('should map the company name and website', () => {
      const name = 'Cool company name'
      const url = 'https://example.org/'

      const item = makeSut().adapt(makeJsonResumeWorkItem({ name, url }))

      expect(item.company.name).toEqual(name)
      expect(item.company.website).toEqual(new URL(url))
    })

    it('should map the position, summary and highlights', () => {
      const highlights = ['Highlight 1', 'Highlight 2']
      const position = 'Position'
      const summary = 'Summary'

      const item = makeSut().adapt(
        makeJsonResumeWorkItem({ highlights, position, summary }),
      )

      expect(item.position).toEqual(position)
      expect(item.summary).toEqual(summary)
      expect(item.highlights).toEqual(highlights)
    })

    it('should map the date range', () => {
      const startDate = '2022-12-31'
      const endDate = '2024-01-01'

      const item = makeSut().adapt(
        makeJsonResumeWorkItem({ startDate, endDate }),
      )

      expect(item.dateRange.start).toEqual(new Date(startDate))
      expect(item.dateRange.end).toEqual(new Date(endDate))
    })

    describe('when no end date', () => {
      it('should map no end date exists too', () => {
        const endDate = undefined

        const item = makeSut().adapt(makeJsonResumeWorkItem({ endDate }))

        expect(item.dateRange.end).toBeUndefined()
      })
    })

    // Non JSON Resume standard!
    it('should map the freelance, internship, promotions and more positions fields', () => {
      const freelance = true
      const internship = true
      const promotions = true
      const morePositions = true

      const item = makeSut().adapt(
        makeJsonResumeWorkItem({
          freelance,
          internship,
          promotions,
          morePositions,
        } as unknown as Partial<JsonResumeWorkItem>),
      )

      expect(item.freelance).toBe(freelance)
      expect(item.internship).toBe(internship)
      expect(item.promotions).toBe(promotions)
      expect(item.morePositions).toBe(morePositions)
    })

    describe('when images mapping is disabled', () => {
      it('should map image', () => {
        const image = 'https://example.org/logo.png'

        const item = makeSut({ mapJsonResumeImages: false }).adapt(
          makeJsonResumeWorkItem({ image }),
        )

        expect(item.company.imageSrc).toEqual(image)
      })
    })

    describe('when images mapping is enabled', () => {
      it('should generate local image path using service', () => {
        const name = 'Còmpány Näme'
        const fakeImageSrc = 'company-name'
        const sut = makeSut({ mapJsonResumeImages: true })
        const localImageService = TestBed.inject(LocalImageService)
        spyOn(localImageService, 'generatePath').and.returnValue(fakeImageSrc)

        const item = sut.adapt(makeJsonResumeWorkItem({ name }))

        expect(item.company.imageSrc).toEqual(fakeImageSrc)
        expect(localImageService.generatePath).toHaveBeenCalledOnceWith({
          name: name,
          subdirectory: sut.ASSETS_SUBDIRECTORY,
        })
      })
    })
  })
})

function makeSut({
  mapJsonResumeImages,
}: Partial<Environment> = {}): JsonResumeExperienceItemAdapterService {
  let providers: unknown[] | undefined
  if (mapJsonResumeImages !== undefined) {
    const environment: Partial<Environment> = {
      mapJsonResumeImages,
    }
    providers = [MockProvider(ENVIRONMENT, environment)]
  }
  TestBed.configureTestingModule({ providers })
  return TestBed.inject(JsonResumeExperienceItemAdapterService)
}

const sampleJsonResumeWorkItem = resume.work[0]

function makeJsonResumeWorkItem(
  overrides?: Partial<JsonResumeWorkItem>,
): JsonResumeWorkItem {
  return {
    ...sampleJsonResumeWorkItem,
    ...overrides,
  } as JsonResumeWorkItem
}
