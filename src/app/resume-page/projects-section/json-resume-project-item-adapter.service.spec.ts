import { TestBed } from '@angular/core/testing'

import resume from '../../../../assets/resume.json'
import {
  InvalidStackValueError,
  JsonResumeProjectItem,
  JsonResumeProjectItemAdapterService,
} from './json-resume-project-item-adapter.service'
import { MockProvider } from 'ng-mocks'
import { ENVIRONMENT } from '@common/injection-tokens'
import { Environment } from '../../../environments'
import { Stack } from './project-item/project-item'
import { LocalImageService } from '../local-image.service'

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
          expect(item.imageSrc).toEqual(image)
        })
      })
      describe('when image mapping is enabled', () => {
        it('should generate local image path using service', () => {
          const name = 'Fóò PröJEct'
          const fakeImageSrc = 'assets/projects/project.png'
          const sut = makeSut({
            mapJsonResumeImages: true,
          })
          const localImageService = TestBed.inject(LocalImageService)
          spyOn(localImageService, 'generatePath').and.returnValue(fakeImageSrc)

          const item = sut.adapt(makeJsonResumeProjectItem({ name, image }))

          expect(item.imageSrc).toEqual(fakeImageSrc)
          expect(localImageService.generatePath).toHaveBeenCalledOnceWith({
            name,
            subdirectory: sut.ASSETS_SUBDIRECTORY,
          })
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
          expect(item.imageSrc).toBeUndefined()
        })
      })
      describe('when image mapping is enabled', () => {
        it('should map no image', () => {
          const image = undefined
          const item = makeSut({
            mapJsonResumeImages: true,
          }).adapt(makeJsonResumeProjectItem({ image }))
          expect(item.imageSrc).toBeUndefined()
        })
      })
    })

    describe('when stack exists', () => {
      it('should map stack', () => {
        const stack = Stack.Full
        const item = makeSut().adapt(makeJsonResumeProjectItem({ stack }))
        expect(item.stack).toEqual(stack)
      })
      it('should raise error if invalid', () => {
        const stack = 'kata-croquet'
        expect(() =>
          makeSut().adapt(makeJsonResumeProjectItem({ stack })),
        ).toThrowError(InvalidStackValueError)
      })
    })

    describe('when stack does not exist', () => {
      it('should map no stack', () => {
        const stack = undefined
        const item = makeSut().adapt(makeJsonResumeProjectItem({ stack }))
        expect(item.stack).toBeUndefined()
      })
    })
  })
})

function makeSut({
  mapJsonResumeImages,
}: Partial<Environment> = {}): JsonResumeProjectItemAdapterService {
  let providers: unknown[] | undefined
  if (mapJsonResumeImages !== undefined) {
    const environment: Partial<Environment> = {
      mapJsonResumeImages,
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
