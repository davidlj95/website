import { TechnologyService } from './technology.service'
import SIMPLE_ICONS_DISPLAY_NAME_AND_COLOR_ENTRIES from './simple-icons-display-name-and-color-entries.json'
import { serviceTestSetup } from '@/test/helpers/service-test-setup'
import { CUSTOM_DISPLAY_NAME_ENTRIES } from './custom-display-name-entries'

describe('TechnologyService', () => {
  let sut: TechnologyService
  const SIMPLE_ICONS_ENTRIES = SIMPLE_ICONS_DISPLAY_NAME_AND_COLOR_ENTRIES[0]
  const SIMPLE_ICON_SLUG = SIMPLE_ICONS_ENTRIES[0]
  const SIMPLE_ICON_DISPLAY_NAME = SIMPLE_ICONS_ENTRIES[1]
  const SIMPLE_ICON_COLOR = SIMPLE_ICONS_ENTRIES[2]

  const CUSTOM_DISPLAY_NAME_ENTRY = CUSTOM_DISPLAY_NAME_ENTRIES[0]
  const CUSTOM_DISPLAY_NAME_SLUG = CUSTOM_DISPLAY_NAME_ENTRY[0]
  const CUSTOM_DISPLAY_NAME = CUSTOM_DISPLAY_NAME_ENTRY[1]

  it('should be created', () => {
    sut = makeSut()
    expect(sut).toBeTruthy()
  })

  describe('display name', () => {
    it('should return display name from simple icons info given a slug', () => {
      sut = makeSut()

      const displayName = sut.getDisplayName(SIMPLE_ICON_SLUG)

      expect(displayName).toEqual(SIMPLE_ICON_DISPLAY_NAME)
    })

    it('should return display name from custom display names given a slug', () => {
      sut = makeSut()

      const displayName = sut.getDisplayName(CUSTOM_DISPLAY_NAME_SLUG)

      expect(displayName).toEqual(CUSTOM_DISPLAY_NAME)
    })

    it('should return nothing when display name cannot be found', () => {
      sut = makeSut()
      const nonExistentIconSlug = 'nonExistentIconSlug'

      const displayName = sut.getDisplayName(nonExistentIconSlug)

      expect(displayName).toBeUndefined()
    })
  })
})

function makeSut() {
  return serviceTestSetup(TechnologyService)
}
