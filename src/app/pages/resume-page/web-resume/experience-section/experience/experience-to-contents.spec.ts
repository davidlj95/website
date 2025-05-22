import { TextContentComponent } from '@/common/chipped-content/text-content/text-content.component'
import { makeExperience } from '../../../data/experience/__tests__/make-experience'
import { ExperienceHighlightsComponent } from './experience-highlights/experience-highlights.component'
import { ExperienceTechComponent } from './experience-tech/experience-tech.component'
import { ChippedContent } from '@/common/chipped-content/chipped-content'
import { experienceToContents } from './experience-to-contents'

describe('experienceToContents', () => {
  it('should include summary content', () => {
    const summary = 'Did amazing things and rocked 100% of time'
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

  it('should include highlights content', () => {
    const highlights = ['Highlight 1', 'Highlight 2']
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

  it('should include technologies content', () => {
    const technologies = ['super-cool-tech', 'another-super-cool-tech']
    const relatedProjects = ['project-1', 'project-2']

    const contents = makeSut()(
      makeExperience({ technologies, relatedProjects }),
    )
    const techContents = contents.filter(
      (content) => content.displayName === 'Tech',
    )

    expect(techContents).toHaveSize(1)
    const techContent =
      techContents[0] as ChippedContent<ExperienceTechComponent>

    expect(techContent.component).toEqual(ExperienceTechComponent)
    expect(techContent.inputs).toEqual({
      technologies,
      projectNames: relatedProjects,
    })
  })
})

const makeSut = () => experienceToContents
