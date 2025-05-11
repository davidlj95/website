import RESUME_JSON from '@/data/resume.json'
import {
  BACKEND_TAG,
  FIND_TECHS_BY_TAG,
  FindTechsByTag,
  INFRA_TAG,
  TECHS_TAGS,
} from './tags'
import { serviceTestSetup } from '@/test/helpers/service-test-setup'

describe('Tags', () => {
  const ALL_TECHS = [
    ...new Set(
      RESUME_JSON.projects
        .flatMap((project) => project.technologies)
        .map((tech) => tech.slug),
    ),
  ].sort()
  it('should contain tags for all techs, defined in alphabetical order', () => {
    const techsInTechTags = Object.entries(TECHS_TAGS).map(
      (techTag) => techTag[0],
    )

    expect(techsInTechTags).toEqual(ALL_TECHS)
  })

  describe('get techs by tag', () => {
    let sut: FindTechsByTag
    const aTag = BACKEND_TAG
    const anotherTag = INFRA_TAG

    beforeEach(() => {
      sut = serviceTestSetup(FIND_TECHS_BY_TAG)
    })

    it('should return all techs with the given tag', () => {
      const actualTechs = sut(aTag)
      const expectedTechs = Object.entries(TECHS_TAGS)
        .filter((entry) => entry[1].includes(aTag))
        .map((entry) => entry[0])

      expect(sort(actualTechs)).toEqual(sort(expectedTechs))
    })

    it('should only include techs with given tags if given', () => {
      const actualTechs = sut(aTag, { includes: [anotherTag] })
      const expectedTechs = Object.entries(TECHS_TAGS)
        .filter(
          (entry) => entry[1].includes(aTag) && entry[1].includes(anotherTag),
        )
        .map((entry) => entry[0])

      expect(sort(actualTechs)).toEqual(sort(expectedTechs))
    })

    it('should exclude techs with given tags', () => {
      const actualTechs = sut(aTag, { excludes: [anotherTag] })
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
