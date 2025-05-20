import { TextContentComponent } from '../../chipped-content/text-content/text-content.component'
import { experienceToContents } from './experience-to-contents'
import { makeExperience } from '../../data/__tests__/make-experience'
import { ExperienceHighlightsComponent } from './experience-highlights/experience-highlights.component'
import { Project } from '../../data/project'
import { makeProject } from '../../data/__tests__/make-project'
import { ExperienceTechComponent } from './experience-tech/experience-tech.component'
import { ChippedContent } from '../../chipped-content/chipped-content'

describe('experienceToContents', () => {
  describe('when summary is present', () => {
    const summary = 'Did amazing things and rocked 100% of time'

    it('should include summary content', () => {
      const sut = makeSut()

      const contents = sut(makeExperience({ summary }))
      const summaryContents = contents.filter(
        (content) => content.displayName === 'Summary',
      )

      expect(summaryContents).toHaveSize(1)
      const summaryContent =
        summaryContents[0] as ChippedContent<TextContentComponent>

      expect(summaryContent.component).toEqual(TextContentComponent)
      expect(summaryContent.inputs).toEqual({
        text: summary,
      })
    })
  })

  describe('when highlights are not empty', () => {
    const highlights = ['Highlight 1', 'Highlight 2']

    it('should include highlights content', () => {
      const sut = makeSut()

      const contents = sut(makeExperience({ highlights }))
      const highlightsContents = contents.filter(
        (content) => content.displayName === 'Highlights',
      )

      expect(highlightsContents).toHaveSize(1)
      const highlightsContent =
        highlightsContents[0] as ChippedContent<ExperienceHighlightsComponent>

      expect(highlightsContent.component).toEqual(ExperienceHighlightsComponent)

      expect(highlightsContent.inputs).toEqual({
        highlights,
      })
    })
  })

  describe('when projects technologies are not empty', () => {
    const aTechnology = 'foo-tech'
    const anotherTechnology = 'bar-tech'
    const technologies = [aTechnology, anotherTechnology]
    const projects: readonly Project[] = [
      makeProject({ technologies: [aTechnology], name: 'project A' }),
      makeProject({
        technologies: [aTechnology, anotherTechnology],
        name: 'project B',
      }),
    ]

    it('should include technologies content with the set of technologies of all projects', () => {
      const sut = makeSut()

      const contents = sut(makeExperience({ projects }))
      const techContents = contents.filter(
        (content) => content.displayName === 'Tech',
      )

      expect(techContents).toHaveSize(1)
      const techContent =
        techContents[0] as ChippedContent<ExperienceTechComponent>

      expect(techContent.component).toEqual(ExperienceTechComponent)
      expect(techContent.inputs).toEqual({
        technologies,
        projectNames: projects.map((project) => project.name),
      })
    })
  })
})

const makeSut = () => experienceToContents
