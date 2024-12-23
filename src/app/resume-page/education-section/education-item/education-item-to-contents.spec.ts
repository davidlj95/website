import { makeEducationItem } from './__tests__/make-education-item'
import { EducationItemCoursesComponent } from './education-item-courses/education-item-courses.component'
import { TextContentComponent } from '../../chipped-content/text-content/text-content.component'
import { educationItemToContents } from './education-item-to-contents'
import { ChippedContent } from '../../chipped-content/chipped-content'

describe('educationItemToContents', () => {
  describe('when score is present', () => {
    const score = 'Very good++'

    it('should include score content', () => {
      const sut = makeSut()

      const contents = sut(makeEducationItem({ score }))
      const scoreContents = contents.filter(
        (content) => content.displayName === 'Score',
      )

      expect(scoreContents).toHaveSize(1)
      const scoreContent =
        scoreContents[0] as ChippedContent<TextContentComponent>

      expect(scoreContent.component).toEqual(TextContentComponent)
      expect(scoreContent.inputs).toEqual({
        text: score,
      })
    })
  })

  describe('when courses are not empty', () => {
    const courses = ['Course 1', 'Course 2']

    it('should include courses content', () => {
      const sut = makeSut()

      const contents = sut(makeEducationItem({ courses }))
      const coursesContents = contents.filter(
        (content) => content.displayName === 'Courses',
      )

      expect(coursesContents).toHaveSize(1)
      const courseContent =
        coursesContents[0] as ChippedContent<EducationItemCoursesComponent>

      expect(courseContent.component).toEqual(EducationItemCoursesComponent)
      expect(courseContent.inputs).toEqual({
        courses,
      })
    })
  })
})

const makeSut = () => educationItemToContents
