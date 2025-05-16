import { TextContentComponent } from '../../chipped-content/text-content/text-content.component'
import { experienceItemToContents } from './experience-item-to-contents'
import { makeExperienceItem } from './__tests__/make-experience-item'
import { ExperienceItemHighlightsComponent } from './experience-item-highlights/experience-item-highlights.component'
import { ProjectItem } from '../../projects-section/project-item/project-item'
import { makeProjectItem } from '../../projects-section/__tests__/make-project-item'
import { ExperienceItemTechComponent } from './experience-item-tech/experience-item-tech.component'
import { ChippedContent } from '../../chipped-content/chipped-content'

describe('experienceItemToContents', () => {
  describe('when summary is present', () => {
    const summary = 'Did amazing things and rocked 100% of time'

    it('should include summary content', () => {
      const sut = makeSut()

      const contents = sut(makeExperienceItem({ summary }))
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

      const contents = sut(makeExperienceItem({ highlights }))
      const highlightsContents = contents.filter(
        (content) => content.displayName === 'Highlights',
      )

      expect(highlightsContents).toHaveSize(1)
      const highlightsContent =
        highlightsContents[0] as ChippedContent<ExperienceItemHighlightsComponent>

      expect(highlightsContent.component).toEqual(
        ExperienceItemHighlightsComponent,
      )

      expect(highlightsContent.inputs).toEqual({
        highlights,
      })
    })
  })

  describe('when projects technologies are not empty', () => {
    const aTechnology = 'foo-tech'
    const anotherTechnology = 'bar-tech'
    const technologies = [aTechnology, anotherTechnology]
    const projects: readonly ProjectItem[] = [
      makeProjectItem({ technologies: [aTechnology], name: 'project A' }),
      makeProjectItem({
        technologies: [aTechnology, anotherTechnology],
        name: 'project B',
      }),
    ]

    it('should include technologies content with the set of technologies of all projects', () => {
      const sut = makeSut()

      const contents = sut(makeExperienceItem({ projects }))
      const techContents = contents.filter(
        (content) => content.displayName === 'Tech',
      )

      expect(techContents).toHaveSize(1)
      const techContent =
        techContents[0] as ChippedContent<ExperienceItemTechComponent>

      expect(techContent.component).toEqual(ExperienceItemTechComponent)
      expect(techContent.inputs).toEqual({
        technologies,
        projectNames: projects.map((project) => project.name),
      })
    })
  })
})

const makeSut = () => experienceItemToContents
