import { TestBed } from '@angular/core/testing'

import resume from '../../../../assets/resume.json'
import {
  JsonResumeProjectItem,
  JsonResumeProjectItemAdapterService,
} from './json-resume-project-item-adapter.service'
import { MockProvider } from 'ng-mocks'
import { ENVIRONMENT } from '../../common/injection-tokens'
import { Environment } from '../../../environments'

describe('JsonResumeProjectItemAdapterService', () => {
  it('should be created', () => {
    expect(makeSut()).toBeTruthy()
  })

  describe('#adapt', () => {
    it('should map name', () => {
      const name = 'Super cool project'
      const item = makeSut().adapt(makeJsonResumeProjectItem({ name }))
      expect(item.name).toEqual(name)
    })

    it('should map description', () => {
      const description = 'Does magic things'
      const item = makeSut().adapt(makeJsonResumeProjectItem({ description }))
      expect(item.description).toEqual(description)
    })

    it('should map start date', () => {
      const startDate = '2022-12-31'
      const item = makeSut().adapt(makeJsonResumeProjectItem({ startDate }))
      expect(item.dateRange.start).toEqual(new Date(startDate))
    })

    describe('when end date exists', () => {
      it('should map end date', () => {
        const endDate = '2023-12-31'
        const item = makeSut().adapt(makeJsonResumeProjectItem({ endDate }))
        expect(item.dateRange.end).toEqual(new Date(endDate))
      })
    })

    describe('when end date does not exist', () => {
      it('should map no end date', () => {
        const endDate = undefined
        const item = makeSut().adapt(makeJsonResumeProjectItem({ endDate }))
        expect(item.dateRange.end).toBeUndefined()
      })
    })

    describe('when website exists', () => {
      it('should map website', () => {
        const url = 'https://example.org/website'
        const item = makeSut().adapt(makeJsonResumeProjectItem({ url }))
        expect(item.website).toEqual(new URL(url))
      })
    })

    describe('when website does not exist', () => {
      it('should map no website', () => {
        const url = undefined
        const item = makeSut().adapt(makeJsonResumeProjectItem({ url }))
        expect(item.website).toBeUndefined()
      })
    })

    it('should map roles', () => {
      const roles = ['Role A', 'Role B']
      const item = makeSut().adapt(makeJsonResumeProjectItem({ roles }))
      expect(item.roles).toEqual(roles)
    })

    describe('when image exists', () => {
      const image = 'https://example.org/project.logo.png'

      describe('when image mapping is disabled', () => {
        it('should map image', () => {
          const item = makeSut({ mapJsonResumeImages: false }).adapt(
            makeJsonResumeProjectItem({ image }),
          )
          expect(item.image).toEqual(new URL(image))
        })
      })
      describe('when image mapping is enabled', () => {
        it('should point to local image based on name', () => {
          const name = 'Fóò PröJEct'
          const slug = 'foo-project'
          const canonicalUrl = 'https://example.org/'
          const sut = makeSut({
            mapJsonResumeImages: true,
            canonicalUrl: new URL(canonicalUrl),
          })

          const item = sut.adapt(makeJsonResumeProjectItem({ name, image }))
          expect(item.image).toEqual(
            new URL(
              `${canonicalUrl}${sut.IMAGE_ASSETS_PATH}${slug}${sut.IMAGE_EXTENSION}`,
            ),
          )
        })
      })
    })

    describe('when image does not exist', () => {
      describe('when image mapping is disabled', () => {
        it('should map no image', () => {
          const image = undefined
          const item = makeSut({ mapJsonResumeImages: false }).adapt(
            makeJsonResumeProjectItem({ image }),
          )
          expect(item.image).toBeUndefined()
        })
      })
      describe('when image mapping is enabled', () => {
        it('should map no image', () => {
          const image = undefined
          const item = makeSut({
            mapJsonResumeImages: true,
          }).adapt(makeJsonResumeProjectItem({ image }))
          expect(item.image).toBeUndefined()
        })
      })
    })
  })
})

function makeSut(opts?: {
  mapJsonResumeImages: boolean
  canonicalUrl?: URL
}): JsonResumeProjectItemAdapterService {
  let providers: unknown[] | undefined
  if (opts) {
    const environment: Partial<Environment> = {
      mapJsonResumeImages: opts.mapJsonResumeImages,
      canonicalUrl: opts.canonicalUrl,
    }
    providers = [MockProvider(ENVIRONMENT, environment)]
  }
  TestBed.configureTestingModule({
    providers,
  })
  return TestBed.inject(JsonResumeProjectItemAdapterService)
}

function makeJsonResumeProjectItem(
  overrides: Partial<JsonResumeProjectItem> = {},
): JsonResumeProjectItem {
  const sampleJsonResumeProjectItem = resume.projects[0]
  return {
    ...sampleJsonResumeProjectItem,
    ...overrides,
  }
}
