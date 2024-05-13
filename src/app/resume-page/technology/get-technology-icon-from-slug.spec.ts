import SIMPLE_ICONS_DISPLAY_NAME_AND_COLOR_ENTRIES from './simple-icons-display-name-and-color-entries.json'
import { serviceTestSetup } from '@/test/helpers/service-test-setup'
import {
  GET_TECHNOLOGY_ICON_FROM_SLUG,
  GetTechnologyIconFromSlug,
} from './get-technology-icon-from-slug'

describe('GetTechnologyIconFromSlug', () => {
  let sut: GetTechnologyIconFromSlug
  const SIMPLE_ICONS_ENTRIES = SIMPLE_ICONS_DISPLAY_NAME_AND_COLOR_ENTRIES[0]
  const SIMPLE_ICON_SLUG = SIMPLE_ICONS_ENTRIES[0]
  const SIMPLE_ICON_COLOR = SIMPLE_ICONS_ENTRIES[2]

  it('should be created', () => {
    expect(makeSut()).toBeTruthy()
  })

  it('should return icon color and path from simple icons', () => {
    sut = makeSut()
    const icon = sut(SIMPLE_ICON_SLUG)

    expect(icon!.hex).toEqual(SIMPLE_ICON_COLOR)
    expect(icon!.slug).toEqual(SIMPLE_ICON_SLUG)
  })

  it('should return nothing when icon does not exist', () => {
    sut = makeSut()
    const nonExistentIconSlug = 'nonExistentIconSlug'
    const icon = sut(nonExistentIconSlug)

    expect(icon).toBeUndefined()
  })
})

const makeSut = () => serviceTestSetup(GET_TECHNOLOGY_ICON_FROM_SLUG)
