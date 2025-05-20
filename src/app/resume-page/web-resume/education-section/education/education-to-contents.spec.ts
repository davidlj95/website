import { makeEducation } from '../../../data/__tests__/make-education'
import { EducationCoursesComponent } from './education-courses/education-courses.component'
import { TextContentComponent } from '@/common/chipped-content/text-content/text-content.component'
import { educationToContents } from './education-to-contents'
import { ChippedContent } from '@/common/chipped-content/chipped-content'

describe('educationToContents', () => {
  describe('when score is present', () => {
    const score = 'Very good++'

    it('should include score content', () => {
      const sut = makeSut()

      const contents = sut(makeEducation({ score }))
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

      const contents = sut(makeEducation({ courses }))
      const coursesContents = contents.filter(
        (content) => content.displayName === 'Courses',
      )

      expect(coursesContents).toHaveSize(1)
      const courseContent =
        coursesContents[0] as ChippedContent<EducationCoursesComponent>

      expect(courseContent.component).toEqual(EducationCoursesComponent)
      expect(courseContent.inputs).toEqual({
        courses,
      })
    })
  })
})

const makeSut = () => educationToContents
