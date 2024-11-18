import { serviceTestSetup } from '@/test/helpers/service-test-setup'
import {
  GET_TECHNOLOGY_DISPLAY_NAME_FROM_SLUG,
  GetTechnologyDisplayNameFromSlug,
} from './get-technology-display-name-from-slug'
import SIMPLE_ICONS_JSON from '@/data/generated/simple-icons.json'
import { CUSTOM_DISPLAY_NAME_ENTRIES } from './custom-display-name-entries'

describe('GetTechnologyDisplayNameFromSlug', () => {
  let sut: GetTechnologyDisplayNameFromSlug

  const SIMPLE_ICONS_ENTRIES = SIMPLE_ICONS_JSON[0]
  const SIMPLE_ICON_SLUG = SIMPLE_ICONS_ENTRIES[0]
  const SIMPLE_ICON_DISPLAY_NAME = SIMPLE_ICONS_ENTRIES[1]

  const CUSTOM_DISPLAY_NAME_ENTRY = CUSTOM_DISPLAY_NAME_ENTRIES[0]
  const CUSTOM_DISPLAY_NAME_SLUG = CUSTOM_DISPLAY_NAME_ENTRY[0]
  const CUSTOM_DISPLAY_NAME = CUSTOM_DISPLAY_NAME_ENTRY[1]

  it('should return display name from simple icons info given a slug', () => {
    sut = makeSut()

    const displayName = sut(SIMPLE_ICON_SLUG)

    expect(displayName).toEqual(SIMPLE_ICON_DISPLAY_NAME)
  })

  it('should return display name from custom display names given a slug', () => {
    sut = makeSut()

    const displayName = sut(CUSTOM_DISPLAY_NAME_SLUG)

    expect(displayName).toEqual(CUSTOM_DISPLAY_NAME)
  })

  it('should return slug when display name cannot be found', () => {
    sut = makeSut()
    const nonExistentIconSlug = 'nonExistentIconSlug'

    const displayName = sut(nonExistentIconSlug)

    expect(displayName).toEqual(nonExistentIconSlug)
  })
})

const makeSut = () => serviceTestSetup(GET_TECHNOLOGY_DISPLAY_NAME_FROM_SLUG)
