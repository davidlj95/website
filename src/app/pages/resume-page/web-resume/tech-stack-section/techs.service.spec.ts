import { BACKEND_TAG, INFRA_TAG, TECHS_TAGS } from './tags'
import { serviceTestSetup } from '@/test/helpers/service-test-setup'
import { TECHS_SERVICE, TechsService } from './techs.service'

describe('TechsService', () => {
  describe('findTechsByTag', () => {
    let sut: TechsService
    const aTag = BACKEND_TAG
    const anotherTag = INFRA_TAG

    beforeEach(() => {
      sut = serviceTestSetup(TECHS_SERVICE)
    })

    it('should return all techs with the given tag', () => {
      const actualTechs = sut.findTechsByTag(aTag)
      const expectedTechs = Object.entries(TECHS_TAGS)
        .filter((entry) => entry[1].includes(aTag))
        .map((entry) => entry[0])

      expect(sort(actualTechs)).toEqual(sort(expectedTechs))
    })

    it('should only include techs with given tags if given', () => {
      const actualTechs = sut.findTechsByTag(aTag, { includes: [anotherTag] })
      const expectedTechs = Object.entries(TECHS_TAGS)
        .filter(
          (entry) => entry[1].includes(aTag) && entry[1].includes(anotherTag),
        )
        .map((entry) => entry[0])

      expect(sort(actualTechs)).toEqual(sort(expectedTechs))
    })

    it('should exclude techs with given tags', () => {
      const actualTechs = sut.findTechsByTag(aTag, { excludes: [anotherTag] })
      const expectedTechs = Object.entries(TECHS_TAGS)
        .filter(
          (entry) => entry[1].includes(aTag) && !entry[1].includes(anotherTag),
        )
        .map((entry) => entry[0])

      expect(sort(actualTechs)).toEqual(sort(expectedTechs))
    })
  })
})

const sort = <T>(a: readonly T[]) => [...a].sort()
