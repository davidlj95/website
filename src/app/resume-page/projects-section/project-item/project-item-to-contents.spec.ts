import { TextContentComponent } from '../../chipped-content/text-content/text-content.component'
import { makeProjectItem } from '../__tests__/make-project-item'
import { projectItemToContents } from './project-item-to-contents'
import { ProjectItemTechnologiesComponent } from './project-item-technologies/project-item-technologies.component'
import { TechnologyItem } from '../../technology/technology-item'
import { makeTechnologyItem } from '../../technology/__tests__/make-technology-item'
import { ChippedContent } from '../../chipped-content/chipped-content'

describe('projectItemToContents', () => {
  describe('when description is present', () => {
    const description = 'Very cool thing and does awesome things'

    it('should include description content', () => {
      const sut = makeSut()

      const contents = sut(makeProjectItem({ description }))
      const descriptionContents = contents.filter(
        (content) => content.displayName === 'Description',
      )

      expect(descriptionContents).toHaveSize(1)
      const descriptionContent =
        descriptionContents[0] as ChippedContent<TextContentComponent>

      expect(descriptionContent.component).toEqual(TextContentComponent)
      expect(descriptionContent.inputs).toEqual({
        text: description,
      })
    })
  })

  describe('when technologies are not empty', () => {
    const items = [
      makeTechnologyItem({ slug: 'super-cool-tech' }),
      makeTechnologyItem({ slug: 'another-super-cool-tech' }),
    ] satisfies readonly TechnologyItem[]

    it('should include technologies content', () => {
      const sut = makeSut()

      const contents = sut(makeProjectItem({ technologies: items }))
      const technologiesContents = contents.filter(
        (content) => content.displayName === 'Tech',
      )

      expect(technologiesContents).toHaveSize(1)
      const technologiesContent =
        technologiesContents[0] as ChippedContent<ProjectItemTechnologiesComponent>

      expect(technologiesContent.component).toEqual(
        ProjectItemTechnologiesComponent,
      )

      expect(technologiesContent.inputs).toEqual({
        items,
      })
    })
  })
})

const makeSut = () => projectItemToContents
