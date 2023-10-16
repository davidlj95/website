import { TestBed } from '@angular/core/testing'

import { LocalImageService } from './local-image.service'
import { SlugGeneratorService } from '../common/slug-generator.service'

describe('LocalImageService', () => {
  it('should be created', () => {
    expect(makeSut()).toBeTruthy()
  })
  describe('#getPath', () => {
    const dummyArgs: Parameters<LocalImageService['getPath']>[0] = {
      name: 'Cool image',
    }

    it('should start by assets directory', () => {
      const sut = makeSut()

      const path = sut.getPath(dummyArgs)

      expect(path.startsWith(sut.ASSETS_PATH)).toBeTruthy()
    })

    it('should include given subdirectory', () => {
      const subdirectory = 'foo'

      const path = makeSut().getPath({ ...dummyArgs, subdirectory })

      expect(path).toEqual(jasmine.stringContaining(subdirectory))
    })

    it('should include slugged name as image filename', () => {
      const name = '"Fòó Bär%='
      const sluggedName = 'foo-bar'
      const sut = makeSut()
      const slugGenerator = TestBed.inject(SlugGeneratorService)
      spyOn(slugGenerator, 'generate').and.returnValue(sluggedName)

      const path = sut.getPath({ name })

      expect(path).toEqual(jasmine.stringContaining(sluggedName))
      expect(slugGenerator.generate).toHaveBeenCalledWith(name)
    })

    it('should finish with default extension', () => {
      const sut = makeSut()

      const path = sut.getPath(dummyArgs)

      expect(path.endsWith(sut.DEFAULT_EXTENSION)).toBeTrue()
    })

    it('should correctly get path for a sample name without subdirectory', () => {
      const name = 'Cool image'
      const sluggedName = 'cool-image'
      const sut = makeSut()
      const slugGenerator = TestBed.inject(SlugGeneratorService)
      spyOn(slugGenerator, 'generate').and.returnValue(sluggedName)

      const path = sut.getPath({ ...dummyArgs, name })

      expect(path).toEqual(
        `${sut.ASSETS_PATH}/${sluggedName}${sut.DEFAULT_EXTENSION}`,
      )
    })

    it('should correctly get path for a sample name with a sample subdirectory', () => {
      const name = 'Cool image'
      const subdirectory = 'logos'
      const sluggedName = 'cool-image'
      const sut = makeSut()
      const slugGenerator = TestBed.inject(SlugGeneratorService)
      spyOn(slugGenerator, 'generate').and.returnValue(sluggedName)

      const path = sut.getPath({ ...dummyArgs, name, subdirectory })

      expect(path).toEqual(
        `${sut.ASSETS_PATH}/${subdirectory}/${sluggedName}${sut.DEFAULT_EXTENSION}`,
      )
    })
  })
})

function makeSut(): LocalImageService {
  TestBed.configureTestingModule({})
  return TestBed.inject(LocalImageService)
}
