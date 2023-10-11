import { TestBed } from '@angular/core/testing'

import { SlugGeneratorService } from './slug-generator.service'

describe('SlugGeneratorService', () => {
  let sut: SlugGeneratorService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    sut = TestBed.inject(SlugGeneratorService)
  })

  it('should be created', () => {
    expect(sut).toBeTruthy()
  })

  describe('#generate', () => {
    it('should lowercase input text', () => {
      expect(sut.generate('FoOBaR')).toEqual('foobar')
    })

    it('should replace spaces with dashes', () => {
      expect(sut.generate('foo bar')).toEqual('foo-bar')
    })

    it('should replace letters with accents or diacritics by the alphabetical letters', () => {
      expect(sut.generate('fòóbär')).toEqual('foobar')
    })

    it('should remove any special character except numbers and underscores', () => {
      expect(sut.generate('^foo!*_bar$42')).toEqual('foo_bar42')
    })
    it('should remove initial and ending dashes', () => {
      expect(sut.generate('-foo-bar-')).toEqual('foo-bar')
    })
    it('should replace consequent dashes by just one dash', () => {
      expect(sut.generate('foo--bar')).toEqual('foo-bar')
    })
    it('when first char is a letter option is not enabled, should not remove characters until it starts with a letter', () => {
      expect(
        sut.generate('42_-foo-bar-42', { firstCharIsALetter: false }),
      ).toEqual('42_-foo-bar-42')
    })
    it('when first char is a letter option is enabled, should remove characters until it starts with a letter', () => {
      expect(
        sut.generate('42_-foo-bar-42', { firstCharIsALetter: true }),
      ).toEqual('foo-bar-42')
    })
    it('when given a prefix, should prepend it', () => {
      const prefix = 'pre-'
      const id = 'foo-bar'
      expect(sut.generate(id, { prefix })).toEqual(`${prefix}${id}`)
    })
  })
})
