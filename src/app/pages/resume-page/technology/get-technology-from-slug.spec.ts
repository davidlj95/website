import TECHS_INDEX from '@/data/generated/techs.json'
import { serviceTestSetup } from '@/test/helpers/service-test-setup'
import {
  GET_TECHNOLOGY_FROM_SLUG,
  GetTechnologyFromSlug,
} from './get-technology-from-slug'
import { TechsIndex } from '@/data/techs'

describe('GetTechnologyFromSlug', () => {
  let sut: GetTechnologyFromSlug
  const TECHS_ENTRY = (TECHS_INDEX as unknown as TechsIndex)[0]

  it('should be created', () => {
    expect(makeSut()).toBeTruthy()
  })

  it('should return tech title, icon availability and color from index file', () => {
    sut = makeSut()
    const slug = TECHS_ENTRY[0]
    const icon = sut(slug)

    expect(icon.slug).toEqual(slug)
    expect(icon.title).toEqual(TECHS_ENTRY[1])
    expect(icon.hasIcon).toEqual(TECHS_ENTRY[2])
    expect(icon.hex).toEqual(TECHS_ENTRY[3]!)
  })
})

const makeSut = () => serviceTestSetup(GET_TECHNOLOGY_FROM_SLUG)
