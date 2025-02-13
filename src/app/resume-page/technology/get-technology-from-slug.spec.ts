import SIMPLE_ICONS_JSON from '@/data/generated/simple-icons.json'
import { serviceTestSetup } from '@/test/helpers/service-test-setup'
import {
  GET_TECHNOLOGY_FROM_SLUG,
  GetTechnologyFromSlug,
} from './get-technology-from-slug'
import { SimpleIconsIndex } from '@/data/simple-icons'

describe('GetTechnologyFromSlug', () => {
  let sut: GetTechnologyFromSlug
  const SIMPLE_ICONS_ENTRY = (
    SIMPLE_ICONS_JSON as unknown as SimpleIconsIndex
  )[0]

  it('should be created', () => {
    expect(makeSut()).toBeTruthy()
  })

  it('should return tech title, icon availability and color from index file', () => {
    sut = makeSut()
    const slug = SIMPLE_ICONS_ENTRY[0]
    const icon = sut(slug)

    expect(icon.slug).toEqual(slug)
    expect(icon.title).toEqual(SIMPLE_ICONS_ENTRY[1])
    expect(icon.hasIcon).toEqual(SIMPLE_ICONS_ENTRY[2])
    expect(icon.hex).toEqual(SIMPLE_ICONS_ENTRY[3]!)
  })
})

const makeSut = () => serviceTestSetup(GET_TECHNOLOGY_FROM_SLUG)
