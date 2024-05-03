import { TechnologyService } from './technology.service'
import SIMPLE_ICONS_DISPLAY_NAME_AND_COLOR_ENTRIES from './simple-icons-display-name-and-color-entries.json'
import { serviceTestSetup } from '@/test/helpers/service-test-setup'
import { CUSTOM_DISPLAY_NAME_AND_COLOR_ENTRIES } from './custom-display-name-and-color-entries'
import { isNotUndefined } from '@/common/is-not-undefined'

describe('TechnologyService', () => {
  let sut: TechnologyService
  const SIMPLE_ICONS_ENTRIES = SIMPLE_ICONS_DISPLAY_NAME_AND_COLOR_ENTRIES[0]
  const SIMPLE_ICON_SLUG = SIMPLE_ICONS_ENTRIES[0]
  const SIMPLE_ICON_DISPLAY_NAME = SIMPLE_ICONS_ENTRIES[1]
  const SIMPLE_ICON_COLOR = SIMPLE_ICONS_ENTRIES[2]

  const CUSTOM_ENTRY_WITH_COLOR = CUSTOM_DISPLAY_NAME_AND_COLOR_ENTRIES.find(
    (entry) => isNotUndefined(entry[2]),
  )!
  const CUSTOM_WITH_COLOR_SLUG = CUSTOM_ENTRY_WITH_COLOR[0]
  const CUSTOM_WITH_COLOR_DISPLAY_NAME = CUSTOM_ENTRY_WITH_COLOR[1]

  it('should be created', () => {
    sut = makeSut()
    expect(sut).toBeTruthy()
  })

  describe('icon', () => {
    it('should return icon color and path from simple icons', () => {
      sut = makeSut()
      const icon = sut.getIcon(SIMPLE_ICON_SLUG)

      expect(icon!.hex).toEqual(SIMPLE_ICON_COLOR)
      expect(icon!.slug).toEqual(SIMPLE_ICON_SLUG)
    })

    // TODO
    //it('should return icon color and path from custom icons for an icon with color', () => {
    //  sut = makeSut()
    //  const icon = sut.getIcon(CUSTOM_WITH_COLOR_SLUG)

    //  expect(icon!.color).toEqual(`#${CUSTOM_WITH_COLOR_COLOR}`)
    //  expect(icon!.path).toEqual(
    //    `${CUSTOM_ICONS_ASSETS_DIR}/${CUSTOM_WITH_COLOR_SLUG}.svg`,
    //  )
    //})
    //
    //it('should return no icon from custom icons for an icon without color', () => {
    //  sut = makeSut()
    //  const icon = sut.getIcon(CUSTOM_WITHOUT_COLOR_SLUG)

    //  expect(icon).toBeNull()
    //})

    it('should return null when icon does not exist', () => {
      sut = makeSut()
      const nonExistentIconSlug = 'nonExistentIconSlug'
      const icon = sut.getIcon(nonExistentIconSlug)

      expect(icon).toBeUndefined()
    })
  })

  describe('display name', () => {
    it('should return display name from simple icons info given a slug', () => {
      sut = makeSut()

      const displayName = sut.getDisplayName(SIMPLE_ICON_SLUG)

      expect(displayName).toEqual(SIMPLE_ICON_DISPLAY_NAME)
    })

    it('should return display name from custom info given a slug', () => {
      sut = makeSut()

      const displayName = sut.getDisplayName(CUSTOM_WITH_COLOR_SLUG)

      expect(displayName).toEqual(CUSTOM_WITH_COLOR_DISPLAY_NAME)
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
