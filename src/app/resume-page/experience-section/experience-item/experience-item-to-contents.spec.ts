import { TextContentComponent } from '../../chipped-content/text-content/text-content.component'
import { experienceItemToContents } from './experience-item-to-contents'
import { makeExperienceItem } from './__tests__/make-experience-item'
import { ExperienceItemHighlightsComponent } from './experience-item-highlights/experience-item-highlights.component'

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
      const summaryContent = summaryContents[0]
      expect(summaryContent.component).toEqual(TextContentComponent)
      expect(summaryContent.inputs).toEqual({
        text: summary,
      } satisfies Partial<TextContentComponent>)
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
      const highlightsContent = highlightsContents[0]
      expect(highlightsContent.component).toEqual(
        ExperienceItemHighlightsComponent,
      )
      expect(highlightsContent.inputs).toEqual({
        highlights,
      } satisfies Partial<ExperienceItemHighlightsComponent>)
    })
  })
})

const makeSut = () => experienceItemToContents