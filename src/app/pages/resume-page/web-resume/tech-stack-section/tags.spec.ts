import RESUME_JSON from '@/data/resume.json'
import { TECHS_TAGS } from './tags'

describe('Tags', () => {
  const ALL_TECHS = [
    ...new Set(RESUME_JSON.projects.flatMap((project) => project.technologies)),
  ].sort()
  it('should contain tags for all techs, defined in alphabetical order', () => {
    const techsInTechTags = Object.entries(TECHS_TAGS).map(
      (techTag) => techTag[0],
    )

    expect(techsInTechTags).toEqual(ALL_TECHS)
  })
})
